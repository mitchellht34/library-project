from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # serialize_only = ('id', 'name')
    serialize_rules = ('-rentals.user',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    # Relationship mapping the user to related rentals
    rentals = db.relationship(
        'Rental', back_populates='user', cascade='all, delete-orphan'
    )

    # Association proxy to get books for this user through rentals
    books = association_proxy('rentals', 'book',
                              creator=lambda book_obj: Rental(book=book_obj))

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError("Name is required.")
        return name


class Rental(db.Model, SerializerMixin):
    __tablename__ = 'rentals'

    serialize_rules = ('-user.rentals', '-book.rentals')

    id = db.Column(db.Integer, primary_key=True)
    copies = db.Column(db.Integer)

    # Foreign key to store the user id
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # Foreign key to store the book id
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

    # Relationship mapping the rental to related users
    user = db.relationship('User', back_populates='rentals')
    # Relationship mapping the rental to related books
    book = db.relationship('Book', back_populates='rentals')

    @validates('copies')
    def validate_copies(self, key, copies):
        if int(copies) < 1:
            raise ValueError('Must rent at least 1 copy')
        if int(copies) > 100:
            raise ValueError('Cannot rent more than 100 copies')
        return copies

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    serialize_rules = ('-rental.book',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    author = db.Column(db.String)

    # Relationship mapping the book to related rentals
    rentals = db.relationship('Rental', back_populates='book', cascade='all, delete-orphan')

    # Association proxy to get users for this book through rentals
    users = association_proxy('rentals', 'user',
                              creator=lambda user_obj: Rental(user=user_obj))

    @validates('title')
    def validate_title(self, key, title):
        if not title:
            raise ValueError("Must have a title")
        return title
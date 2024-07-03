#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource
from werkzeug.exceptions import NotFound

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Book, Rental

# Views go here!

class Users(Resource):

    def get(self):

        response_dict_list = [user.to_dict() for user in User.query.all()]

        response = make_response(
            response_dict_list,
            200,
        )

        return response

    def post(self):
        new_record = User(name=request.form['name'])

        db.session.add(new_record)
        db.session.commit()

        response_dict = new_record.to_dict()

        response = make_response(
            response_dict,
            201,
        )

        return response

api.add_resource(Users, '/users')

class UserByID(Resource):

    def get(self, id):

        user = User.query.filter_by(id=id).first()
        
        if user:
            response_dict = user.to_dict()
            code = 200
        else:
            response_dict = {"message": "User not found"}
            code = 404

        response = make_response(
            response_dict,
            code,
        )

        return response

api.add_resource(UserByID, '/users/<int:id>')

class Books(Resource):

    def get(self):

        response_dict_list = [book.to_dict() for book in Book.query.all()]

        response = make_response(
            response_dict_list,
            200,
        )

        return response

    def post(self):
        new_record = Book(
            title=request.form['title'],
            author=request.form['author'],
        )

        db.session.add(new_record)
        db.session.commit()

        response_dict = new_record.to_dict()

        response = make_response(
            response_dict,
            201,
        )

        return response

api.add_resource(Books, '/books')

class BookByID(Resource):

    def get(self, id):

        book = Book.query.filter_by(id=id).first()
        
        if book:
            response_dict = book.to_dict()
            code = 200
        else:
            response_dict = {"message": "Book not found"}
            code = 404

        response = make_response(
            response_dict,
            code,
        )

        return response

    def patch(self, id):

        record = Book.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(record, attr, request.form[attr])

        db.session.add(record)
        db.session.commit()

        response_dict = record.to_dict()

        response = make_response(
            response_dict,
            200
        )

        return response

    def delete(self, id):

        record = Book.query.filter_by(id=id).first()

        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}

        response = make_response(
            response_dict,
            200
        )

        return response

api.add_resource(BookByID, '/books/<int:id>')

class Rentals(Resource):

    def get(self):

        response_dict_list = [rental.to_dict() for rental in Rental.query.all()]

        response = make_response(
            response_dict_list,
            200,
        )

        return response

    def post(self):
        new_record = Rental(
            copies=request.form['copies'],
            user_id=request.form['user_id'],
            book_id=request.form['book_id'],
        )

        db.session.add(new_record)
        db.session.commit()

        response_dict = new_record.to_dict()

        response = make_response(
            response_dict,
            201,
        )

        return response

api.add_resource(Rentals, '/rentals')

class RentalByID(Resource):

    def get(self, id):

        rental = Rental.query.filter_by(id=id).first()
        
        if rental:
            response_dict = rental.to_dict()
            code = 200
        else:
            response_dict = {"message": "Book not found"}
            code = 404

        response = make_response(
            response_dict,
            code,
        )

        return response

api.add_resource(RentalByID, '/rentals/<int:id>')

@app.errorhandler(NotFound)
def handle_not_found(e):

    response = make_response(
        "Not Found: The requested resource does not exist.",
        404
    )

    return response

app.register_error_handler(404, handle_not_found)


if __name__ == '__main__':
    app.run(port=5555, debug=True)


#!/usr/bin/env python3

# Standard library imports
import datetime
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Book, Rental

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        
        # db.create_all()

        User.query.delete()
        Book.query.delete()
        Rental.query.delete()

        db.create_all()

        u1 = User(name = "Joe")
        u2 = User(name = "Angelika")
        u3 = User(name = "Zach")

        b1 = Book(title = "1984", author = "George Orwell")
        b2 = Book(title = "Lord of the Flies", author = "William Golding")
        b3 = Book(title = "To Kill a Mockingbird", author = "Harper Lee")

        r1 = Rental(copies = 2, user = u1, book = b1)
        r2 = Rental(copies = 1, user = u2, book = b2)
        r3 = Rental(copies = 1, user = u2, book = b3)

        db.session.add_all([u1, u2, u3])
        db.session.add_all([b1, b2, b3])
        db.session.add_all([r1, r2, r3])
        db.session.commit()
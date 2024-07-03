#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

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

        response_dict = User.query.filter_by(id=id).first().to_dict()

        response = make_response(
            response_dict,
            200,
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

        response_dict = Book.query.filter_by(id=id).first().to_dict()

        response = make_response(
            response_dict,
            200,
        )

        return response

api.add_resource(BookByID, '/books/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)


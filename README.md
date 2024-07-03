# Library Rentals

Gift Ideas is a CLI app used to store gift ideas for different recipients using Python.

## Installation

Navigate to the server directory and install the dependencies using pipenv install

If you would like to run a debugger also run pipenv shell to navigate to the python shell

```bash
pip install
pipenv shell
```

Open a second terminal. Either navigate to the client directory or run npm install with the client prefix
```bash
npm install --prefix client
```

## Usage

App is set up with a seed file with a few basic books, users, and and rentals objects already created

```python
# seeds the data
python lib/seed.py

# runs the program (backend and frontend respectively)
python server/app.py
npm start --prefix client
```

## Models
The models.py file has the setup for the database.

A Book has a title and an author

A User has a name

A Rental shows has many copies of a Book a User rented

## App.py
All API routes are located here. Book, User, and Rental all have a Get, GetByID, and Post, Books also has a Patch and Delete.

## Frontend

The frontend build with react has a navbar and components at each link directed through routes. The user components shows the user list and an option to add a new user. The book component shows the book list and the options to add a new book, edit a book, or delete a book. The rental components show who rented how many copies of what books. When editing a book, it will take you to a new page. All forms are validated with Formik.


## Link

[Github](https://github.com/mitchellht34/library-project)
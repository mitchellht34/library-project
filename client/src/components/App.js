import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Users from "./Users";
import Books from "./Books";
import Rentals from "./Rentals";
import BookUpdate from "./BookUpdate";

function App() {

  const [users, setUsers] = useState([{}]);
  const [books, setBooks] = useState([{}]);
  const [rentals, setRentals] = useState([{}]);
  const [selectedUser, setSelectedUser] = useState("")
  const [selectedBook, setSelectedBook] = useState("")
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    console.log("FETCH! ");
    fetch("http://127.0.0.1:5555/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      });
  }, [refreshPage]);

  useEffect(() => {
    console.log("FETCH! ");
    fetch("http://127.0.0.1:5555/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        console.log(data);
        console.log("user", selectedUser)
      });
  }, [refreshPage]);

  useEffect(() => {
    console.log("FETCH! ");
    fetch("http://127.0.0.1:5555/rentals")
    .then((res) => res.json())
    .then((data) => {
      setRentals(data);
      console.log("rentals",data);
    });
  }, [refreshPage]);

  return (
    <div>
      <BrowserRouter >
        <NavBar />
        <Switch>
          <Route exact path="/">
            <h1>Welcome to the Library rental Home Page</h1>
          </Route>
          <Route path="/users">
            <Users users={users} setUsers={setUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>
          </Route>
          <Route path="/books">
            <Books books={books} setBooks={setBooks} selectedUser={selectedUser} selectedBook={selectedBook} setSelectedBook={setSelectedBook} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>
          </Route>
          <Route path="/rentals">
            <Rentals rentals={rentals} setRentals={setRentals} selectedUser={selectedUser} selectedBook={selectedBook} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>
          </Route>
          <Route path="/book/:bookId">
            <BookUpdate />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

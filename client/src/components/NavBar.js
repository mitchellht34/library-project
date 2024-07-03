import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {

  return (
    <div>
      <NavLink
        to="/"
        exact
        style={{ marginRight: "10px" }}
      >
        Home
      </NavLink>
      <NavLink
        to="/users"
        style={{ marginRight: "10px" }}
      >
        Users
      </NavLink>
      <NavLink
        to="/books"
        style={{ marginRight: "10px" }}
      >
        Books
      </NavLink>
      <NavLink
        to="/rentals"
        style={{ marginRight: "10px" }}
      >
        Rentals
      </NavLink>
    </div>
  );
}

export default NavBar;
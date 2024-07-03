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
        to="/1"
        style={{ marginRight: "10px" }}
      >
        Search
      </NavLink>
      <NavLink
        to="/2"
        style={{ marginRight: "10px" }}
      >
        My Favorites
      </NavLink>
    </div>
  );
}

export default NavBar;
import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <BrowserRouter >
        <NavBar />
        <Switch>
          <Route exact path="/">
            <h1>This is my Project Client route /</h1>
          </Route>
          <Route path="/1">
            <h1>This is my Project Client route /1</h1>
          </Route>
          <Route path="/2">
            <h1>This is my Project Client route /2</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

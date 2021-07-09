import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Car from "./pages/Car";
export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route path="/fav">
              <Favorite />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/car">
              <Car />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;

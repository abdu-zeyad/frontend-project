import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Car from "./pages/Car";
import axios from "axios";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { itemData: [] };
  }
  carinfo = async (id) => {
    console.log(id);
    const server = process.env.REACT_APP_SERVER;
    const data = await axios.get(`${server}/itempage?id=${id}`);
    this.setState({
      itemData: data.data,
    });
    console.log(data.data);
  };
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
              <Home carinfo={this.carinfo} />
            </Route>
            <Route exact path="/car">
              <Car itemData={this.state.itemData} />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;

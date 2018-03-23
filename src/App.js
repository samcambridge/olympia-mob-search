import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";

import ItemSearch from "./Components/ItemSearch.js";
import NpcView from "./Components/NpcView.js";
import Calculator from "./Components/Calculator.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            Helbreath Olympia Tools<br />
            <small>Developed by e11even &amp; ocambridge</small>
          </header>

          <nav style={{ textAlign: "center", marginTop: "20px" }}>
            <Link style={{ marginRight: 20 }} to={`/`}>
              NPC Drop Search
            </Link>
            <Link to={`/calculator`}>
              Helbreath Olympia Character Simulator
            </Link>
          </nav>

          <Route exact={true} path="/" component={ItemSearch} />
          <Route
            path="/m/:npc"
            render={({ match }) => <NpcView npc={match.params.npc} />}
          />
          <Route exact={true} path="/calculator" component={Calculator} />
        </div>
      </Router>
    );
  }
}

export default App;

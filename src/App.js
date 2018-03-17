import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import ItemSearch from "./Components/ItemSearch.js";
import NpcView from "./Components/NpcView.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            Helbreath Olympia NPC Drop Search
          </header>

          <Route exact={true} path="/" component={ItemSearch} />
          <Route
            path="/m/:npc"
            render={({ match }) => <NpcView npc={match.params.npc} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;

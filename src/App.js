import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "./App.css";
import npcData from "./data.json";

import _ from "lodash";

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

class ItemSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keys: []
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    let search = e.target.value.toLowerCase(),
      results = [];

    if (search !== "") {
      results = _.mapValues(npcData, function(k, v) {
        if (v.includes(search)) {
          return v;
        }
      });

      this.setState({ keys: Object.keys(_.omitBy(results, _.isNil)) });
    } else {
      this.setState({ keys: [] });
    }
  }
  render() {
    const items = [];
    this.state.keys.forEach(item => {
      items.push(<Item key={item} dataKey={item} />);
    });
    return (
      <div>
        <div className="App-search">
          <input
            type="text"
            placeholder="i.e. exceptional, plate mail"
            autoFocus
            onKeyUp={this.handleKeyPress}
          />
        </div>

        <div className="App-data">
          {items.length === 0 ? (
            <p>
              Search for items to see what NPC's drop them: i.e. exceptional
            </p>
          ) : (
            <div>{items}</div>
          )}
        </div>
      </div>
    );
  }
}

class NpcView extends Component {
  render() {
    let keys = [];
    keys = _.pickBy(
      npcData,
      function(o, k) {
        if (o.find(val => val.includes(this.props.npc))) {
          return true;
        }
      }.bind(this)
    );

    const items = [];
    Object.keys(keys).forEach(item => {
      items.push(
        <p className="npcItem" key={item}>
          {item}
        </p>
      );
    });

    return (
      <div className="App-data">
        <Link to={`/`}>Back to main search</Link>
        <h1>{this.props.npc}</h1>
        <p>Drop List:</p>
        {items}
      </div>
    );
  }
}

class Item extends Component {
  render() {
    const npcs = [];
    npcData[this.props.dataKey].forEach(npc => {
      npcs.push(<Npc key={npc} npc={npc} />);
    });

    return (
      <div className="Item" key={this.props.dataKey}>
        <h1>{this.props.dataKey}</h1>
        <h2>Dropped by:</h2>
        <div>{npcs}</div>
      </div>
    );
  }
}

class Npc extends Component {
  render() {
    return <Link to={`/m/${this.props.npc}`}>{this.props.npc}</Link>;
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import npcData from "./data.json";

import _ from "lodash";

class App extends Component {
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
      <div className="App">
        <header className="App-header">
          Helbreath Olympia NPC Drop Search
        </header>

        <div class="App-search">
          <input
            type="text"
            placeholder="i.e. exceptional, plate mail"
            autoFocus
            onKeyUp={this.handleKeyPress}
          />
        </div>

        <div class="App-data">
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

class Item extends Component {
  render() {
    return (
      <div className="Item" key={this.props.dataKey}>
        <h1>{this.props.dataKey}</h1>
        <h2>Dropped by:</h2>
        <Npc npcs={npcData[this.props.dataKey]} />
      </div>
    );
  }
}

class Npc extends Component {
  render() {
    return <p>{this.props.npcs.join(", ")}</p>;
  }
}

export default App;

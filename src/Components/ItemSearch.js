import React, { Component } from "react";
import _ from "lodash";
import npcData from "./../data.json";

import Item from "./Item.js";

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
      items.push(<Item key={item} dataKey={item} npcData={npcData} />);
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

export default ItemSearch;

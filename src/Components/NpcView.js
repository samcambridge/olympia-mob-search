import React, { Component } from "react";
import _ from "lodash";
import npcData from "./../data.json";
import { Link } from "react-router-dom";

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

export default NpcView;

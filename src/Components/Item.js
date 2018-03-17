import React, { Component } from "react";
import Npc from "./Npc.js";

class Item extends Component {
  render() {
    const npcs = [];
    this.props.npcData[this.props.dataKey].forEach(npc => {
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

export default Item;

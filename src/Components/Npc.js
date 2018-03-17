import React, { Component } from "react";
import { Link } from "react-router-dom";

class Npc extends Component {
  render() {
    return <Link to={`/m/${this.props.npc}`}>{this.props.npc}</Link>;
  }
}

export default Npc;

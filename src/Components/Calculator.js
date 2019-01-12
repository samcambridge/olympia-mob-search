import React, { Component } from "react";
import NumericInput from 'react-numeric-input';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var points = [70, 73, 76, 79, 82, 85, 88, 91, 94, 97, 100, 103, 106, 109, 112, 115, 118, 121, 124, 127, 130, 133, 136, 139, 142, 145, 148, 151, 154, 157, 160,
    163, 166, 169, 172, 175, 178, 181, 184, 187, 190, 193, 196, 199, 202, 205, 208, 211, 214, 217, 220, 223, 226, 229, 232, 235, 238, 241, 244, 247, 250,
    253, 256, 259, 262, 265, 268, 271, 274, 277, 280, 283, 286, 289, 292, 295, 298, 301, 304, 307, 310, 313, 316, 319, 322, 325, 328, 331, 334, 337, 340,
    343, 346, 349, 352, 355, 358, 361, 364, 367, 370, 373, 376, 379, 382, 385, 388, 391, 394, 397, 400, 403, 406, 409, 412, 415, 418, 421, 424, 427, 430,
    433, 436, 439, 442, 445, 448, 451, 454, 457, 460, 463, 466, 469, 472, 475, 478, 481, 484, 487, 490, 493, 496, 499, 502, 505, 508, 511, 514, 517, 520,
    523, 526, 529, 532, 535, 538, 541, 544, 547, 550, 553, 556, 559, 562]
    var strength = document.getElementById("strength");
    var dexterity = document.getElementById("dexterity");
    var intellect = document.getElementById("intellect");
    var magic = document.getElementById("magic");
    var vitallity = document.getElementById("vitallity");
    var luck = document.getElementById("luck");
    var level = document.getElementById("level");
    var total = +strength.value + +dexterity.value + +intellect.value + +magic.value + +vitallity.value + +luck.value
    if (total > 70) {
      level.value = 2
    }
    console.log(points.length);
  }

  render() {
    return (
      <div className="App-search">
        <NumericInput min={10} max={200} value={10} id="strength" onChange={this.handleChange}/>
        <NumericInput min={10} max={200} value={10} id="dexterity" onChange={this.handleChange}/>
        <NumericInput min={10} max={200} value={10} id="intellect" onChange={this.handleChange}/>
        <NumericInput min={10} max={200} value={10} id="magic" onChange={this.handleChange}/>
        <NumericInput min={10} max={200} value={10} id="vitallity" onChange={this.handleChange}/>
        <NumericInput min={10} max={200} value={10} id="luck" onChange={this.handleChange}/>
        <NumericInput min={1} max={140} value={1} id="level"/>
        <NumericInput min={0} max={25} value={0} name="rebirth"/>
      </div>
    );
  }
}

export default Calculator;

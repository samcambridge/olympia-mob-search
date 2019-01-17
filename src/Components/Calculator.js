import React, { Component } from "react";
import NumericInput from 'react-numeric-input';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.isKeyPressed = this.isKeyPressed.bind(this);
  }

  isKeyPressed(event) {
    if (event.shiftKey) {
      var value = 10
    } else {
      var value = 1
    }
    var plus_or_minus = event.target.id.split("_")[0]
    var attribute = event.target.id.split("_")[1]
    var attribute_field = document.getElementById(attribute);
    if (Number(attribute_field.value) < 200) {
      if (plus_or_minus === "plus") {
        attribute_field.value = +attribute_field.value + +value
      }
    }
    if (value === 10 && Number(attribute_field.value) > 190) {
      if (plus_or_minus === "plus") {
        value = 200 - attribute_field.value
        attribute_field.value = +attribute_field.value + +value
      }
    }
    if (value === 10 && Number(attribute_field.value) < 20) {
      value = attribute_field.value - 10
      if (plus_or_minus === "minus") {
        attribute_field.value = attribute_field.value - value
      }
    }
    if (value === 10 && Number(attribute_field.value) > 20) {
      if (plus_or_minus === "minus") {
        attribute_field.value = attribute_field.value - value
      }
    }
    if (value === 1 && Number(attribute_field.value) > 10) {
      if (plus_or_minus === "minus") {
        attribute_field.value = attribute_field.value - value
      }
    }

    var strength = document.getElementById("strength");
    var dexterity = document.getElementById("dexterity");
    var intellect = document.getElementById("intellect");
    var magic = document.getElementById("magic");
    var vitallity = document.getElementById("vitallity");
    var luck = document.getElementById("luck");
    var level = document.getElementById("level");
    var rebirth = document.getElementById("rebirth");
    var remainingpoints = document.getElementById("remainingpoints");

    var total = +strength.value + +dexterity.value + +intellect.value + +magic.value + +vitallity.value + +luck.value

    var points = this.getPoints();
    this.calculateStats(points, remainingpoints, level, rebirth, total);
    this.calculateAttributes(vitallity.value, level.value, strength.value)
  }

  calculateAttributes(vitallity, level, strength){
    var new_hp = +(vitallity * 2) + +(level * 5 / 2) + +(strength * 2 / 3);
    var health = document.getElementById("health");
    health.innerHTML = Math.floor(new_hp)
  }

  getPoints(){
    var points = [{level: 1, points: 70, rebirth: 0}, {level: 2, points: 73, rebirth: 0}, {level: 3, points: 76, rebirth: 0}, {level: 4, points: 79, rebirth: 0}, {level: 5, points: 82, rebirth: 0},
    {level: 6, points: 85, rebirth: 0}, {level: 7, points: 88, rebirth: 0}, {level: 8, points: 91, rebirth: 0}, {level: 9, points: 94, rebirth: 0}, {level: 10, points: 97, rebirth: 0},
    {level: 11, points: 100, rebirth: 0}, {level: 12, points: 103, rebirth: 0}, {level: 13, points: 106, rebirth: 0}, {level: 14, points: 109, rebirth: 0}, {level: 15, points: 112, rebirth: 0},
    {level: 16, points: 115, rebirth: 0}, {level: 17, points: 118, rebirth: 0}, {level: 18, points: 121, rebirth: 0}, {level: 19, points: 124, rebirth: 0}, {level: 20, points: 127, rebirth: 0},
    {level: 21, points: 130, rebirth: 0}, {level: 22, points: 133, rebirth: 0}, {level: 23, points: 136, rebirth: 0}, {level: 24, points: 139, rebirth: 0}, {level: 25, points: 142, rebirth: 0},
    {level: 26, points: 145, rebirth: 0}, {level: 27, points: 148, rebirth: 0}, {level: 28, points: 151, rebirth: 0}, {level: 29, points: 154, rebirth: 0}, {level: 30, points: 157, rebirth: 0},
    {level: 31, points: 160, rebirth: 0}, {level: 32, points: 163, rebirth: 0}, {level: 33, points: 166, rebirth: 0}, {level: 34, points: 169, rebirth: 0}, {level: 35, points: 172, rebirth: 0},
    {level: 36, points: 175, rebirth: 0}, {level: 37, points: 178, rebirth: 0}, {level: 38, points: 181, rebirth: 0}, {level: 39, points: 184, rebirth: 0}, {level: 40, points: 187, rebirth: 0},
    {level: 41, points: 190, rebirth: 0}, {level: 42, points: 193, rebirth: 0}, {level: 43, points: 196, rebirth: 0}, {level: 44, points: 199, rebirth: 0}, {level: 45, points: 202, rebirth: 0},
    {level: 46, points: 205, rebirth: 0}, {level: 47, points: 208, rebirth: 0}, {level: 48, points: 211, rebirth: 0}, {level: 49, points: 214, rebirth: 0}, {level: 50, points: 217, rebirth: 0},
    {level: 51, points: 220, rebirth: 0}, {level: 52, points: 223, rebirth: 0}, {level: 53, points: 226, rebirth: 0}, {level: 54, points: 229, rebirth: 0}, {level: 55, points: 232, rebirth: 0},
    {level: 56, points: 235, rebirth: 0}, {level: 57, points: 238, rebirth: 0}, {level: 58, points: 241, rebirth: 0}, {level: 59, points: 244, rebirth: 0}, {level: 60, points: 247, rebirth: 0},
    {level: 61, points: 250, rebirth: 0}, {level: 62, points: 253, rebirth: 0}, {level: 63, points: 256, rebirth: 0}, {level: 64, points: 259, rebirth: 0}, {level: 65, points: 262, rebirth: 0},
    {level: 66, points: 265, rebirth: 0}, {level: 67, points: 268, rebirth: 0}, {level: 68, points: 271, rebirth: 0}, {level: 69, points: 274, rebirth: 0}, {level: 70, points: 277, rebirth: 0},
    {level: 71, points: 280, rebirth: 0}, {level: 72, points: 283, rebirth: 0}, {level: 73, points: 286, rebirth: 0}, {level: 74, points: 289, rebirth: 0}, {level: 75, points: 292, rebirth: 0},
    {level: 76, points: 295, rebirth: 0}, {level: 77, points: 298, rebirth: 0}, {level: 78, points: 301, rebirth: 0}, {level: 79, points: 304, rebirth: 0}, {level: 80, points: 307, rebirth: 0},
    {level: 81, points: 310, rebirth: 0}, {level: 82, points: 313, rebirth: 0}, {level: 83, points: 316, rebirth: 0}, {level: 84, points: 319, rebirth: 0}, {level: 85, points: 322, rebirth: 0},
    {level: 86, points: 325, rebirth: 0}, {level: 87, points: 328, rebirth: 0}, {level: 88, points: 331, rebirth: 0}, {level: 89, points: 334, rebirth: 0}, {level: 90, points: 337, rebirth: 0},
    {level: 91, points: 340, rebirth: 0}, {level: 92, points: 343, rebirth: 0}, {level: 93, points: 346, rebirth: 0}, {level: 94, points: 349, rebirth: 0}, {level: 95, points: 352, rebirth: 0},
    {level: 96, points: 355, rebirth: 0}, {level: 97, points: 358, rebirth: 0}, {level: 98, points: 361, rebirth: 0}, {level: 99, points: 364, rebirth: 0}, {level: 100, points: 367, rebirth: 0},
    {level: 101, points: 370, rebirth: 0}, {level: 102, points: 373, rebirth: 0}, {level: 103, points: 376, rebirth: 0}, {level: 104, points: 379, rebirth: 0}, {level: 105, points: 382, rebirth: 0},
    {level: 106, points: 385, rebirth: 0}, {level: 107, points: 388, rebirth: 0}, {level: 108, points: 391, rebirth: 0}, {level: 109, points: 394, rebirth: 0}, {level: 110, points: 397, rebirth: 0},
    {level: 111, points: 400, rebirth: 0}, {level: 112, points: 403, rebirth: 0}, {level: 113, points: 406, rebirth: 0}, {level: 114, points: 409, rebirth: 0}, {level: 115, points: 412, rebirth: 0},
    {level: 116, points: 415, rebirth: 0}, {level: 117, points: 418, rebirth: 0}, {level: 118, points: 421, rebirth: 0}, {level: 119, points: 424, rebirth: 0}, {level: 120, points: 427, rebirth: 0},
    {level: 121, points: 430, rebirth: 0}, {level: 122, points: 433, rebirth: 0}, {level: 123, points: 436, rebirth: 0}, {level: 124, points: 439, rebirth: 0}, {level: 125, points: 442, rebirth: 0},
    {level: 126, points: 445, rebirth: 0}, {level: 127, points: 448, rebirth: 0}, {level: 128, points: 451, rebirth: 0}, {level: 129, points: 454, rebirth: 0}, {level: 130, points: 457, rebirth: 0},
    {level: 131, points: 460, rebirth: 0}, {level: 132, points: 463, rebirth: 0}, {level: 133, points: 466, rebirth: 0}, {level: 134, points: 469, rebirth: 0}, {level: 135, points: 472, rebirth: 0},
    {level: 136, points: 475, rebirth: 0}, {level: 137, points: 478, rebirth: 0}, {level: 138, points: 481, rebirth: 0}, {level: 139, points: 484, rebirth: 0}, {level: 140, points: 487, rebirth: 0},
    {level: 140, points: 490, rebirth: 1}, {level: 140, points: 493, rebirth: 2}, {level: 140, points: 496, rebirth: 3}, {level: 140, points: 499, rebirth: 4}, {level: 140, points: 502, rebirth: 5},
    {level: 140, points: 505, rebirth: 6}, {level: 140, points: 508, rebirth: 7}, {level: 140, points: 511, rebirth: 8}, {level: 140, points: 514, rebirth: 9}, {level: 140, points: 517, rebirth: 10},
    {level: 140, points: 520, rebirth: 11}, {level: 140, points: 523, rebirth: 12}, {level: 140, points: 526, rebirth: 13}, {level: 140, points: 529, rebirth: 14}, {level: 140, points: 532, rebirth: 15},
    {level: 140, points: 535, rebirth: 16}, {level: 140, points: 538, rebirth: 17}, {level: 140, points: 541, rebirth: 18}, {level: 140, points: 544, rebirth: 19}, {level: 140, points: 547, rebirth: 20},
    {level: 140, points: 550, rebirth: 21}, {level: 140, points: 553, rebirth: 22}, {level: 140, points: 556, rebirth: 23}, {level: 140, points: 559, rebirth: 24}, {level: 140, points: 562, rebirth: 25}]
    return points;
  }

  calculateStats(points, remainingpoints, level, rebirth, total) {
    //this is basically the calculator, figures out level/rebirth/remainingpoints
    for (var i = 0; i < points.length; i++) {
      //if total is less than/equal to 70 set the remainingpoints value to be the first points array minus total
      //this is slightly different to all other remaining points as at level 1 you have a maxmimum of 10 points remaining instead of 3
      if (total <= 70) {
        remainingpoints.value = points[0].points - total
        level.value = points[0].level
        rebirth.value = points[0].rebirth
      }
      if (points[i + 1] !== undefined) {
        //find out which value i am inbetween
        if (total > points[i].points && total <= points[i + 1].points) {
          //set values
          remainingpoints.value = points[i + 1].points - total
          level.value = points[i + 1].level
          rebirth.value = points[i + 1].rebirth
        }
      }
    }
  }

  handleChange(event) {
    //onkeydown disable arrow keys (fucks up calculations)
    if ( event.which === 38 || event.which === 40 ) {
      event.preventDefault();
    } else {
      if (event.target.value > 200) {
        event.target.value = 200
      }
      var points = this.getPoints();
      var strength = document.getElementById("strength");
      var dexterity = document.getElementById("dexterity");
      var intellect = document.getElementById("intellect");
      var magic = document.getElementById("magic");
      var vitallity = document.getElementById("vitallity");
      var luck = document.getElementById("luck");
      var level = document.getElementById("level");
      var rebirth = document.getElementById("rebirth");
      var remainingpoints = document.getElementById("remainingpoints");

      //setting the values here to be 200 if value is more than 200 allows us to use onChange instead of something like onBlur
      //allowing us to use the keyboard to edit values and not have to tab out to calculate
      if (strength.value > 200) {
        strength.value = 200
      }
      if (dexterity.value > 200) {
        dexterity.value = 200
      }
      if (intellect.value > 200) {
        intellect.value = 200
      }
      if (magic.value > 200) {
        magic.value = 200
      }
      if (vitallity.value > 200) {
        vitallity.value = 200
      }
      if (luck.value > 200) {
        luck.value = 200
      }

      var total = +strength.value + +dexterity.value + +intellect.value + +magic.value + +vitallity.value + +luck.value

      if (event.target.value >= 10 && event.target.value <= 200) {
        //if the total amount is over 562 (maximum points available)
        if (total > 562) {
          //take away the new total away from 562 to give the maximum points available
          var figure = total - 562
          //then set the entered value to be the maximum points available
          event.target.value = (event.target.value - figure)
          //then set the total to be 562 as it still thinks its more
          total = 562
        }
        //loop through points array
        this.calculateStats(points, remainingpoints, level, rebirth, total);
        this.calculateAttributes(vitallity.value, level.value, strength.value)
      }
    }
  }

  render() {
    return (
      <div className="App-search">
        strength<NumericInput min={10} max={200} value={10} id="strength" onInput={this.handleChange} onBlur={this.handleChange} onKeyDown={this.handleChange}/><a id="plus_strength" onClick={this.isKeyPressed}>+</a><a id="minus_strength" onClick={this.isKeyPressed}>-</a><br/>
        dexterity<NumericInput min={10} max={200} value={10} id="dexterity" onInput={this.handleChange} onBlur={this.handleChange} onKeyDown={this.handleChange}/><a id="plus_dexterity" onClick={this.isKeyPressed}>+</a><a id="minus_dexterity" onClick={this.isKeyPressed}>-</a><br/>
        intellect<NumericInput min={10} max={200} value={10} id="intellect" onInput={this.handleChange} onBlur={this.handleChange} onKeyDown={this.handleChange}/><a id="plus_intellect" onClick={this.isKeyPressed}>+</a><a id="minus_intellect" onClick={this.isKeyPressed}>-</a><br/>
        magic<NumericInput min={10} max={200} value={10} id="magic" onInput={this.handleChange} onBlur={this.handleChange} onKeyDown={this.handleChange}/><a id="plus_magic" onClick={this.isKeyPressed}>+</a><a id="minus_magic" onClick={this.isKeyPressed}>-</a><br/>
        vitallity<NumericInput min={10} max={200} value={10} id="vitallity" onInput={this.handleChange} onBlur={this.handleChange} onKeyDown={this.handleChange}/><a id="plus_vitallity" onClick={this.isKeyPressed}>+</a><a id="minus_vitallity" onClick={this.isKeyPressed}>-</a><br/>
        luck<NumericInput min={10} max={200} value={10} id="luck" onInput={this.handleChange} onBlur={this.handleChange} onKeyDown={this.handleChange}/><a id="plus_luck" onClick={this.isKeyPressed}>+</a><a id="minus_luck" onClick={this.isKeyPressed}>-</a><br/>
        level<NumericInput min={1} max={140} value={1} id="level"/><br/>
        rebirth<NumericInput min={0} max={25} value={0} id="rebirth"/><br/>
        remaining points<NumericInput min={0} max={10} value={10} id="remainingpoints"/><br/>
        Health: <span id="health">28</span>
      </div>
    );
  }
}

export default Calculator;

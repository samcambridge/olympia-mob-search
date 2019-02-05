import React, { Component } from "react";
import NumericInput from 'react-numeric-input';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.isKeyPressed = this.isKeyPressed.bind(this);
    this.addOrRemoveActive = this.addOrRemoveActive.bind(this);
    this.calculateStats = this.calculateStats.bind(this);
    this.addTalentAttributes = this.addTalentAttributes.bind(this);
    this.addAngelAttribute = this.addAngelAttribute.bind(this);
    this.removeAngel = this.removeAngel.bind(this);
  }

  addAngelAttribute(event) {
    var level = document.getElementById("level");
    if (level.value === "140") {
      var active_angel = document.getElementsByClassName("active-angel")
      var attr = event.target.id.split("_")[0];
      var attribute = document.getElementById(attr)
      if (event.target.classList.contains("active-angel")) {
        event.target.classList.remove("active-angel")
        attribute.classList.remove("angel-attribute")
        attribute.value = +attribute.value - 16
      } else {
        if (active_angel.length === 0) {
          event.target.classList.add("active-angel")
          attribute.classList.add("angel-attribute")
          attribute.value = +attribute.value + 16
        }
      }
      var strength = document.getElementById("strength");
      var dexterity = document.getElementById("dexterity");
      var intellect = document.getElementById("intellect");
      var magic = document.getElementById("magic");
      var vitallity = document.getElementById("vitallity");
      var luck = document.getElementById("luck");
      this.calculateAttributes(vitallity.value, level.value, strength.value, magic.value, intellect.value)
    } else {
      return alert("You need to be atleast level 140 before adding an angel")
    }
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

    var strength = document.getElementById("strength");
    var dexterity = document.getElementById("dexterity");
    var intellect = document.getElementById("intellect");
    var magic = document.getElementById("magic");
    var vitallity = document.getElementById("vitallity");
    var luck = document.getElementById("luck");
    var level = document.getElementById("level");
    var rebirth = document.getElementById("rebirth");
    var remainingpoints = document.getElementById("remainingpoints");

    var tank = document.getElementById("tank");
    var merien = document.getElementById("merien");
    if (tank.classList.contains("active")) {
      vitallity.classList.remove("talent-attribute")
      tank.classList.remove("active")
      this.removeTankCalculation(vitallity, level)
    }
    if (merien.classList.contains("active")) {
      strength.classList.remove("talent-attribute")
      magic.classList.remove("talent-attribute")
      merien.classList.remove("active")
      this.removeMerienCalculation(strength, magic)
    }

    this.removeAngel()

    var total = +strength.value + +dexterity.value + +intellect.value + +magic.value + +vitallity.value + +luck.value

    if (total < 562) {
      if (Number(attribute_field.value) < 200) {
        if (plus_or_minus === "plus") {
          if (value === 10) {
            if (total > 552) {
              value = 562 - total
              attribute_field.value = +attribute_field.value + +value
            } else {
              attribute_field.value = +attribute_field.value + +value
            }
          } else {
            attribute_field.value = +attribute_field.value + +value
          }
        }
      }
      if (value === 10 && Number(attribute_field.value) > 190) {
        if (plus_or_minus === "plus") {
          value = 200 - attribute_field.value
          attribute_field.value = +attribute_field.value + +value
        }
      }
    }
    if (value === 10 && Number(attribute_field.value) <= 20) {
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

    //called again to find get total
    var total = +strength.value + +dexterity.value + +intellect.value + +magic.value + +vitallity.value + +luck.value

    var points = this.getPoints();
    this.calculateStats(points, remainingpoints, level, rebirth, total);
    this.calculateAttributes(vitallity.value, level.value, strength.value, magic.value, intellect.value)
  }

  calculateAttributes(vitallity, level, strength, magic, intellect){
    // calculate hp/mana etc
    var xelima = document.getElementById("xelima");
    if (xelima.classList.contains("active")) {
      var new_hp = Math.floor(((+(vitallity * 2) + +(level * 5 / 2) + +(strength * 2 / 3)) / 100) * 75);
    } else {
      var new_hp = +(vitallity * 2) + +(level * 5 / 2) + +(strength * 2 / 3);
    }
    //random calculation bug when clicking intro strength box at level 1
    if (new_hp === 29.166666666666668) {
      new_hp = 28
    }
    var health = document.getElementById("health");
    health.innerHTML = Math.floor(new_hp)
    var new_mana = +(magic * 2) + +(level * 2) + +(intellect / 2);
    var mana = document.getElementById("mana");
    mana.innerHTML = Math.floor(new_mana)
    var new_stamina = +10 + +strength + +(level * 2);
    var stamina = document.getElementById("stamina");
    stamina.innerHTML = Math.floor(new_stamina)
    var new_load = +(strength * 5) + +(level * 5);
    var load = document.getElementById("load");
    load.innerHTML = Math.floor(new_load)
  }

  removeAngel(){
    var active_angel = document.getElementsByClassName("active-angel")
    for (var i = 0; i < active_angel.length; i++) {
      var attribute_id = active_angel[i].id.split("_")[0];
      active_angel[i].classList.remove("active-angel")
      var attribute = document.getElementById(attribute_id);
      attribute.classList.remove("angel-attribute")
      attribute.value = +attribute.value - 16
    }
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
    //this is the calculator that figures out level/rebirth/remainingpoints
    var active_talents = document.getElementsByClassName("active")
    var tank = document.getElementById("tank");
    var merien = document.getElementById("merien");
    var vitallity = document.getElementById("vitallity");
    var magic = document.getElementById("magic");
    if (tank.classList.contains("active")) {
      total = total - this.calculateTalentValue(level)
    }
    for (var i = 0; i < points.length; i++) {
      //if total is less than/equal to 70 set the remainingpoints value to be the first points array minus total
      //this is slightly different to all other remaining points as at level 1 you have a maxmimum of 10 points remaining instead of 3
      if (total <= 70) {
        remainingpoints.innerHTML = points[0].points - total
        level.value = points[0].level
        rebirth.innerHTML = points[0].rebirth
      }
      if (points[i + 1] !== undefined) {
        //find out which value i am inbetween
        if (total > points[i].points && total <= points[i + 1].points) {
          //set values
          remainingpoints.innerHTML = points[i + 1].points - total
          level.value = points[i + 1].level
          rebirth.innerHTML = points[i + 1].rebirth
        }
      }
    }
    //removing talents if go below certain level
    if (level.value < 10) {
      for (var i = 0; i < active_talents.length; i++) {
        var id = active_talents[i].id
        active_talents[i].classList.remove("active");
        if (id === "tank") {
          vitallity.classList.remove("talent-attribute")
          this.removeTankCalculation(vitallity, level)
          this.addTalentAttributes();
        }
      }
    }
    if (level.value > 10 && level.value < 40) {
      if (active_talents.length > 1) {
        active_talents[0].classList.remove("active");
        if (active_talents[0].id === "tank") {
          vitallity.classList.remove("talent-attribute")
          this.removeTankCalculation(vitallity, level)
          this.addTalentAttributes();
        }
      }
    }
  }

  calculateTalentValue(level) {
    if (level.value < 20) {
      return 15
    }
    if (level.value >= 20 && level.value < 40) {
      return 16
    }
    if (level.value >= 40 && level.value < 60) {
      return 17
    }
    if (level.value >= 60 && level.value < 80) {
      return 18
    }
    if (level.value >= 80 && level.value < 100) {
      return 19
    }
    if (level.value >= 100 && level.value < 120) {
      return 20
    }
    if (level.value >= 120 && level.value < 140) {
      return 21
    }
    if (level.value == 140) {
      return 22
    }
  }

  addTankCalculation(attribute, level) {
    if (level.value < 20) {
      attribute.value = +attribute.value + 15
    }
    if (level.value >= 20 && level.value < 40) {
      attribute.value = +attribute.value + 16
    }
    if (level.value >= 40 && level.value < 60) {
      attribute.value = +attribute.value + 17
    }
    if (level.value >= 60 && level.value < 80) {
      attribute.value = +attribute.value + 18
    }
    if (level.value >= 80 && level.value < 100) {
      attribute.value = +attribute.value + 19
    }
    if (level.value >= 100 && level.value < 120) {
      attribute.value = +attribute.value + 20
    }
    if (level.value >= 120 && level.value < 140) {
      attribute.value = +attribute.value + 21
    }
    if (level.value == 140) {
      attribute.value = +attribute.value + 22
    }
  }

  removeTankCalculation(attribute, level) {
    if (level.value < 20) {
      attribute.value = +attribute.value - 15
    }
    if (level.value >= 20 && level.value < 40) {
      attribute.value = +attribute.value - 16
    }
    if (level.value >= 40 && level.value < 60) {
      attribute.value = +attribute.value - 17
    }
    if (level.value >= 60 && level.value < 80) {
      attribute.value = +attribute.value - 18
    }
    if (level.value >= 80 && level.value < 100) {
      attribute.value = +attribute.value - 19
    }
    if (level.value >= 100 && level.value < 120) {
      attribute.value = +attribute.value - 20
    }
    if (level.value >= 120 && level.value < 140) {
      attribute.value = +attribute.value - 21
    }
    if (level.value == 140) {
      attribute.value = +attribute.value - 22
    }
  }

  removeMerienCalculation(strength, magic) {
    strength.value = +strength.value - 15
    magic.value = +magic.value - 15
  }

  addMerienCalculation(strength, magic) {
    strength.value = +strength.value + 15
    magic.value = +magic.value + 15
  }

  addTalentAttributes(event){
    var active_talents = document.getElementsByClassName("active")
    var strength = document.getElementById("strength");
    var magic = document.getElementById("magic");
    var intellect = document.getElementById("intellect");
    var merien = document.getElementById("merien");
    var vitallity = document.getElementById("vitallity");
    var level = document.getElementById("level");
    var tank = document.getElementById("tank");
    if (event === "tank") {
      if (tank.classList.contains("active")) {
        vitallity.classList.add("talent-attribute")
        this.addTankCalculation(vitallity, level)
      } else {
        vitallity.classList.remove("talent-attribute")
        this.removeTankCalculation(vitallity, level)
      }
    }
    if (event === "merien") {
      if (merien.classList.contains("active")) {
        strength.classList.add("talent-attribute")
        magic.classList.add("talent-attribute")
        this.addMerienCalculation(strength, magic)
      } else {
        strength.classList.remove("talent-attribute")
        magic.classList.remove("talent-attribute")
        this.removeMerienCalculation(strength, magic)
      }
    }
    this.calculateAttributes(vitallity.value, level.value, strength.value, magic.value, intellect.value)
  }

  addOrRemoveActive(event){
    var level = document.getElementById("level");
    var active_talents = document.getElementsByClassName("active")
    if (level.value < 10) {
      return alert("You need to be atleast level 10 before choosing your first talent")
    } else {
      if (level.value >= 10 && level.value < 40) {
        if (event.target.classList.contains("active")) {
          event.target.classList.remove("active");
        } else {
          if (active_talents.length === 1) {
            return alert("You need to be atleast level 40 before choosing your second talent")
          } else {
            if (active_talents.length < 2) {
              event.target.classList.add("active");
            } else {
              return alert("You can only select two talents");
            }
          }
        }
      }
    }
    if (level.value >= 40) {
      if (event.target.classList.contains("active")) {
        event.target.classList.remove("active");
      } else {
        if (active_talents.length < 2) {
          event.target.classList.add("active");
        } else {
          return alert("You can only select two talents");
        }
      }
    }
    if (event.target.id === "tank") {
      this.addTalentAttributes("tank");
    }
    if (event.target.id === "merien") {
      this.addTalentAttributes("merien");
    }
    if (event.target.id === "xelima") {
      var strength = document.getElementById("strength");
      var intellect = document.getElementById("intellect");
      var magic = document.getElementById("magic");
      var vitallity = document.getElementById("vitallity");
      var level = document.getElementById("level");
      this.calculateAttributes(vitallity.value, level.value, strength.value, magic.value, intellect.value)
    }
  }

  handleChange(event) {
    if (event.target.value === "") {
      event.target.value = 10
    }
    var level = document.getElementById("level");
    var strength = document.getElementById("strength");
    var magic = document.getElementById("magic");
    var vitallity = document.getElementById("vitallity");
    var tank = document.getElementById("tank");
    var merien = document.getElementById("merien");
    if (tank.classList.contains("active")) {
      vitallity.classList.remove("talent-attribute")
      tank.classList.remove("active")
      this.removeTankCalculation(vitallity, level)
    }
    if (merien.classList.contains("active")) {
      strength.classList.remove("talent-attribute")
      magic.classList.remove("talent-attribute")
      merien.classList.remove("active")
      this.removeMerienCalculation(strength, magic)
    }
    this.removeAngel()
    //onkeydown disable arrow keys (fucks up calculations)
    if ( event.which === 38 || event.which === 40 ) {
      event.preventDefault();
    } else {
      if (event.target.value > 200) {
        event.target.value = 200
      }
      var points = this.getPoints();
      var dexterity = document.getElementById("dexterity");
      var intellect = document.getElementById("intellect");
      var luck = document.getElementById("luck");
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
        this.calculateAttributes(vitallity.value, level.value, strength.value, magic.value, intellect.value)
      }
    }
  }

  render() {
    return (
      <div className="App-search">
        <div className="simulator-container">
          <div className="absolute">
            <div className="simulator-title">
              The character simulator allows you to test different possible stats for your character.<br/>
              Hold Shift to change by 10 points.<br/>
              Or type in the attributes box.
            </div>
            <div className="level">
              Level: <NumericInput size={3} readOnly min={1} max={140} value={1} id="level"/>
            </div>
            <div className="rebirth">
              Rebirth level: <span id="rebirth">0</span>
            </div>
            <div className="remainingpoints">
              Points left <span id="remainingpoints">10</span>
            </div>
            <div className="health">
              Health points <span id="health">28</span>
            </div>
            <div className="mana">
              Mana points <span id="mana">27</span>
            </div>
            <div className="stamina">
              Stamina <span id="stamina">22</span>
            </div>
            <div className="load">
              Max weight <span id="load">55</span>
            </div>
            <div className="strength">
              STR <NumericInput size={3} min={10} max={200} value={10} id="strength" onInput={this.handleChange} onBlur={this.handleChange} onKeyDown={this.handleChange}/>
            <a id="plus_strength" className="plus-or-minus" onClick={this.isKeyPressed}>+</a><a id="minus_strength" className="plus-or-minus" onClick={this.isKeyPressed}>-</a>
            </div>
            <div className="vitallity">
              VIT <NumericInput size={3} min={10} max={200} value={10} id="vitallity" onInput={this.handleChange} onBlur={this.handleChange} onKeyDown={this.handleChange}/>
              <a id="plus_vitallity" className="plus-or-minus" onClick={this.isKeyPressed}>+</a><a id="minus_vitallity" className="plus-or-minus" onClick={this.isKeyPressed}>-</a>
            </div>
            <div className="dexterity">
              DEX <NumericInput size={3} min={10} max={200} value={10} id="dexterity" onInput={this.handleChange} onBlur={this.handleChange} onKeyDown={this.handleChange}/>
              <a id="plus_dexterity" className="plus-or-minus" onClick={this.isKeyPressed}>+</a><a id="minus_dexterity" className="plus-or-minus" onClick={this.isKeyPressed}>-</a>
            </div>
            <div className="intellect">
              INT <NumericInput size={3} min={10} max={200} value={10} id="intellect" onInput={this.handleChange} onBlur={this.handleChange} onKeyDown={this.handleChange}/>
              <a id="plus_intellect" className="plus-or-minus" onClick={this.isKeyPressed}>+</a><a id="minus_intellect" className="plus-or-minus" onClick={this.isKeyPressed}>-</a>
            </div>
            <div className="magic">
              MAG <NumericInput size={3} min={10} max={200} value={10} id="magic" onInput={this.handleChange} onBlur={this.handleChange} onKeyDown={this.handleChange}/>
              <a id="plus_magic" className="plus-or-minus" onClick={this.isKeyPressed}>+</a><a id="minus_magic" className="plus-or-minus" onClick={this.isKeyPressed}>-</a>
            </div>
            <div className="luck">
              LUK <NumericInput size={3} min={10} max={200} value={10} id="luck" onInput={this.handleChange} onBlur={this.handleChange} onKeyDown={this.handleChange}/>
            <a id="plus_luck" className="plus-or-minus" onClick={this.isKeyPressed}>+</a><a id="minus_luck" className="plus-or-minus" onClick={this.isKeyPressed}>-</a>
            </div>
            <div className="talents">
              Choose talents<br/>
              <a id="shortsword" onClick={this.addOrRemoveActive}>Short Sword</a>
              <a id="longsword" onClick={this.addOrRemoveActive}>Long Sword</a>
              <a id="fencing" onClick={this.addOrRemoveActive}>Fencing</a>
              <a id="axe" onClick={this.addOrRemoveActive}>Axe</a>
              <a id="hammer" onClick={this.addOrRemoveActive}>Hammer</a>
              <a id="archery" onClick={this.addOrRemoveActive}>Archery</a>
              <a id="earth" onClick={this.addOrRemoveActive}>Earth</a>
              <a id="lightning" onClick={this.addOrRemoveActive}>Lightning</a>
              <a id="fire" onClick={this.addOrRemoveActive}>Fire</a>
              <a id="ice" onClick={this.addOrRemoveActive}>Ice</a>
              <a id="holy" onClick={this.addOrRemoveActive}>Holy</a>
              <a id="poison" onClick={this.addOrRemoveActive}>Poison</a>
              <a id="tank" onClick={this.addOrRemoveActive}>Tank</a>
              <a id="xelima" onClick={this.addOrRemoveActive}>Xelima</a>
              <a id="merien" onClick={this.addOrRemoveActive}>Merien</a>
            </div>
          </div>
          <img src={'/character_simulator.png'} alt="charactersim" className="simulator-image"/>
          <img src={'/mod_simulator.png'} alt="charactersim" className="mod-image"/>
          <div className="relative">
            <img src={'/strengthangel.png'} className="angel" alt="strengthangel" id="strength_angel" onClick={this.addAngelAttribute}/>
            <img src={'/dexterityangel.png'} className="angel" alt="strengthangel" id="dexterity_angel" onClick={this.addAngelAttribute}/>
            <img src={'/intellectangel.png'} className="angel" alt="strengthangel" id="intellect_angel" onClick={this.addAngelAttribute}/>
            <img src={'/magicangel.png'} className="angel" alt="strengthangel" id="magic_angel" onClick={this.addAngelAttribute}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;

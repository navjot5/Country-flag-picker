import React, { Component } from 'react';


import './App.css';



var ALLDATA = require('./continents.json');
var CONTINENTS = ALLDATA.map(element => element['continent']);
var COUNTRIES = "";
var i;
var j;
var contArr = [];
var flag="";
var appendFlag = "";
var continent_to_be_set;
var continentArr = [];
var initialflag = "";




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      continent: "",
      continent_dropdown: null,
      final_continent: "",
      country: "",
      currflag:"",
      country_dropdown: null,
      final_countries: [],

      }
  }

  generateContinentDropDown(value) {
    var all_candidates = CONTINENTS.filter(element => (element.toLowerCase().includes(value.toLowerCase())));
    var elements = all_candidates.map((element) => {
      return (<div key={Math.random()}>
        <div onClick={this.setContinent.bind(this)} continent_val={element}>{element}</div>
      </div>);
    });
    this.setState({
      continent_dropdown: elements
    });
  }
  setContinent(event) {
    var name :"";
    //var contArr = [];
    var continent_to_be_set = event.target.getAttribute("continent_val");

    for(i in ALLDATA){
      //console.log(obj)
      if(ALLDATA[i].continent === continent_to_be_set){
        continentArr.push(continent_to_be_set)
        COUNTRIES = ALLDATA[i].countries;
        console.log(COUNTRIES)
        for(j in COUNTRIES){

          name = COUNTRIES[j].name;
          contArr.push(name)
          //console.log(contArr)
        }
      }
    }
    this.setState({
      final_continent: continent_to_be_set
    });
  }
  handleContinentChange(event) {
    var curr_value = event.target.value;
    this.setState({
      continent: curr_value
    }, ()=> {
      this.generateContinentDropDown(curr_value);
    })
  }
  handleCountryChange(event) {
    var curr_value = event.target.value;
    this.setState({
      country: curr_value
    }, () => {
      this.generateCountryDropDown(curr_value);
    //  console.log(this.state.country);
    });
  }
  generateCountryDropDown(value) {
    //var all_candidates = contArr.filter();
  //console.log(all_candidates)
    var elements = contArr.map((element) => {
      return (<div key={Math.random()}>
        <div onClick={this.setCountry.bind(this)} country_val={element}>{element}</div>
      </div>);
    });
    this.setState({
      country_dropdown: elements
    });
  }

  setCountry(event) {
    var country_to_be_set = event.target.getAttribute("country_val");

    var continent = continentArr[0]
    var i;
    var j;
    for(i in ALLDATA){
      //console.log(obj)
      if(ALLDATA[i].continent === continent){
        //COUNTRIES = ALLDATA[i].countries;
        //console.log(country_to_be_set)
        for(j in COUNTRIES){
          if(COUNTRIES[j].name === country_to_be_set){
            flag = COUNTRIES[j].flag
            appendFlag=appendFlag+" "+flag
            //flagArr.push(flag)
            //console.log(flagArr)
            //console.log(flag)
          }
        }
      }
    }
    //name = COUNTRIES[j].name
    //  console.log(country_to_be_set)

    this.setState({
      currflag: appendFlag

    //final_countries: country_to_be_set
    //final_countries: country_to_be_set
  });
}
resetForm = () => {
   this.setState({
     currflag:""

   }
   );
 }


render() {
  return (
      <div className="App">

        <div className="Step1">
          <h1> Step 1 </h1>
          <h4> Select a continent. </h4>
        </div>

        <input className = "continentinput" type="text" placeholder = {"Continent"} value = {this.state.continent} onChange = {this.handleContinentChange.bind(this)} />
        <div className= "dropdowncontinent">{this.state.continent_dropdown}</div>
        <div className = "continentText">You selected: </div>
        <div className ="continentSelected" >{this.state.final_continent}</div>
        <div className="Step2">
          <h1> Step 2 </h1>
          <h4> Now, select a country. </h4>
        </div>

        <input className = "countryinput" type="text" placeholder = {"Country"} value = {this.state.country} onChange = {this.handleCountryChange.bind(this)} />
        <div className = "dropdowncountry">{this.state.country_dropdown}</div>
        <div className = "flagText">
        <h1> Selected Flags: </h1>
        </div>
        <div className="flag">{ this.state.currflag }</div>
        <button className ="button"
          onClick={this.resetForm}
            type="button">Clear flags</button>
            </div>
    );
  }
}

export default App;

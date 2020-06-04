import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export class Search extends Component {
  constructor() {
    super();
    this.state = {
      origin: "N/A",
      destination: "N/A",
      depart_date: "",
      return_date: "",
      depart_time: "",
      id: "",
      passengers: 0,
      price: 50000,
      flights: [],
      flag: false,
      tabTog: "One-Way",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    //console.log(e.target.value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.get("Data.json").then((handle) =>
      this.setState(
        {
          flights: handle.data,
          flag: true,
        },
        () => {
          const origin = this.state.flights.map((flight) => flight.origin);
          //console.log(origin);
        }
      )
    );
  };

  destinationChecker() {
    if (this.state.flag === true) {
      if (this.state.tabTog === "One-Way") {
        return (
          <h2>
            {this.state.origin} --> {this.state.destination}
          </h2>
        );
      } else {
        //console.log("In else");
        return (
          <h2>
            {this.state.origin} --> {this.state.destination} -->
            {this.state.origin}
          </h2>
        );
      }
    }
  }

  dateChecker() {
    if (this.state.flag === true) {
      return (
        <React.Fragment>
          <p>Leave: {this.state.depart_date}</p>
          <p> Return: {this.state.return_date}</p>
        </React.Fragment>
      );
    }
  }

  closestMatch() {
    if (this.state.flag === true) {
      return <h3 style={{ color: "red" }}>Closest Match</h3>;
    }
  }

  checkcriteria() {
    var done = false;
    var price = 0;
    if (this.state.flag === false) {
      return <h1>Please Enter critera</h1>;
    } else {
      //console.log("In else");
      return this.state.flights.map((flight) => {
        if (
          flight.origin === this.state.origin &&
          flight.destination === this.state.destination &&
          flight.date === this.state.depart_date
        ) {
          //console.log("in flight if-statement");
          done = true;
          if (this.state.tabTog === "One-Way") {
            price = flight.cost * this.state.passengers;
            if (price <= this.state.price) {
              return (
                <div style={{ outline: "3px double black", float: "left" }}>
                  <h1>Cost: Rs.{price}</h1>
                  <h3>{flight.id}</h3>
                  <h2>From: {flight.origin}</h2>
                  <h2>To: {flight.destination}</h2>
                  <h2>Date: {flight.date}</h2>
                  <h2>Depart Time: {flight.depart_Time}</h2>
                  <input type="button" value="Book Now" />
                </div>
              );
            }
          } else {
            price = flight.cost * 2 * this.state.passengers;
            return this.state.flights.map((flight2) => {
              if (
                flight2.origin === flight.destination &&
                flight2.destination === flight.origin
              ) {
                if (price <= this.state.price) {
                  //console.log("this should print something");
                  return (
                    <div style={{ outline: "3px double black", float: "left" }}>
                      <div style={{ float: "left", width: "60%" }}>
                        <h1>Cost: Rs.{price}</h1>
                        <h3>{flight.id}</h3>
                        <h2>To: {flight.destination}</h2>
                        <h2>Date: {flight.date}</h2>
                        <h2>Depart Time: {flight.depart_Time}</h2>
                        <input
                          type="button"
                          value="Book Now"
                        />
                      </div>
                      <div style={{ float: "right", width: "40%" }}>
                        <h1></h1>
                        <h3>{flight2.id}</h3>
                        <h2>Return From: {flight2.origin}</h2>
                        <h2>Date: {flight2.date}</h2>
                        <h2>Depart Time: {flight2.depart_Time}</h2>
                      </div>
                    </div>
                  );
                } else {
                  return;
                }
              } else {
                return;
              }
            });
          }
        }
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ float: "left", width: "30%" }}>
          <Tabs
            defaultActiveKey="One-Way"
            id="tabssss"
            onSelect={(k) => this.setState({ tabTog: k })}
          >
            >
            <Tab eventKey="One-Way" title="One-Way">
              <form style={container}>
                <div>
                  <input
                    type="text"
                    name="origin"
                    style={{
                      flex: "10px",
                      padding: "5px",
                      width: "90%",
                      margin: "5px 0px",
                    }}
                    placeholder="Enter origin"
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="destination"
                    style={{
                      flex: "10",
                      padding: "5px",
                      width: "90%",
                      margin: "5px 0px",
                    }}
                    placeholder="Enter destination"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="date"
                    name="depart_date"
                    style={{
                      flex: "10",
                      padding: "5px",
                      width: "90%",
                      margin: "5px 0px",
                    }}
                    placeholder="Enter Departure Date"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="passengers"
                    style={{
                      flex: "10",
                      padding: "5px",
                      width: "90%",
                      margin: "5px 0px",
                    }}
                    placeholder="No Of Passengers"
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <input
                    type="submit"
                    name="submit"
                    style={{
                      flex: "10",
                      padding: "5px",
                      background: "green",
                      color: "white",
                      width: "40%",
                      margin: "20px 0px 5px 0px",
                    }}
                    placeholder="Submit"
                    onClick={this.handleSubmit}
                  />
                </div>
              </form>
            </Tab>
            <Tab eventKey="Return" title="Return">
              <form style={container}>
                <div>
                  <input
                    type="text"
                    name="origin"
                    style={{
                      flex: "10px",
                      padding: "5px",
                      width: "90%",
                      margin: "5px 0px",
                    }}
                    placeholder="Enter origin"
                    onChange={this.handleChange}
                    required
                    className="origin_return"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="destination"
                    style={{
                      flex: "10",
                      padding: "5px",
                      width: "90%",
                      margin: "5px 0px",
                    }}
                    placeholder="Enter destination"
                    onChange={this.handleChange}
                    required
                    className="destination_return"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    name="depart_date"
                    style={{
                      flex: "10",
                      padding: "5px",
                      width: "90%",
                      margin: "5px 0px",
                    }}
                    placeholder="Enter Departure Date"
                    onChange={this.handleChange}
                    required
                    className="dept_date_return"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    name="return_date"
                    style={{
                      flex: "10",
                      padding: "5px",
                      width: "90%",
                      margin: "5px 0px",
                    }}
                    placeholder="Enter Return Date"
                    onChange={this.handleChange}
                    className="arr_date_return"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="passengers"
                    style={{
                      flex: "10",
                      padding: "5px",
                      width: "90%",
                      margin: "5px 0px",
                    }}
                    placeholder="No Of Passengers"
                    onChange={this.handleChange}
                    className="passengers_return"
                  />
                </div>
                <div>
                  <input
                    type="submit"
                    name="submit"
                    style={{
                      flex: "10",
                      padding: "5px",
                      background: "green",
                      color: "white",
                      width: "40%",
                      margin: "20px 0px 5px 0px",
                    }}
                    placeholder="Submit"
                    onClick={this.handleSubmit}
                    className="submit_return"
                  />
                </div>
              </form>
            </Tab>
          </Tabs>
          <div style={{ outline: "2px solid black" }}>
            <label> Refine Flight search</label>
            <input
              type="range"
              min="1"
              max="50000"
              defaultValue="50000"
              name="price"
              onChange={this.handleChange}
              style={{}}
            />
            {this.state.price}
          </div>
        </div>

        <div style={display_text} className="results">
          <div style={{ float: "left", width: "70%" }}>
            {this.destinationChecker()}
          </div>
          <div
            style={{ float: "right", width: "20%"}}
          >
            {this.dateChecker()}
          </div>
          <div
            style={{ float: "left", width: "70%"}}
          >
            {this.closestMatch()}
            {this.checkcriteria()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const container = {
  background: "#333",
  color: "#fff",
  textAlign: "left",
  padding: "10px",
};

const display_text = {
  float: "right",
  width: "70%",
  textAlign: "left",
  //margin: "auto",
  padding: "10px 0px 5px 10px",
  //outline: "1px solid red",
};

export default Search;

import React from "react";
import { Link } from "react-router-dom";
import logo from "../css/img/lucifer.png";

export default class About extends React.Component {
  render() {
    return (
      <div className="topic">
        <nav>
          <div className="image">
            <img src={logo} alt="Lucifer" />
          </div>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/forcast"}>Forcast</Link>
            </li>
            <li>
              <Link to={"/"}>About</Link>
            </li>
          </ul>
        </nav>

        <div className="start">
          <h1>About</h1>
          <h2>Weather API : </h2>
          <a href="https://openweathermap.org/" target="_blank">
            www.openweathermap.org
          </a>
          <br></br>
          <h2>Country Lists : </h2>
          <a
            href="https://github.com/dr5hn/countries-states-cities-database"
            target="_blank"
          >
            Country Database JSON
          </a>
        </div>
      </div>
    );
  }
}

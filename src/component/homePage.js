import React from "react";
import "../css/style.css";
import { Link } from "react-router-dom";
import logo from "../css/img/lucifer.png";

class HomePage extends React.Component {
  render() {
    return (
      <div className="topic">
        <nav>
          <div>
            <div className="image">
              <img src={logo} alt="Lucifer" />
            </div>
          </div>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/forcast"}>Forcast</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
          </ul>
        </nav>
        <div className="start">
          <h1>Welcome to Forcasting Web</h1>
          <Link to={"/forcast"}>
            <button>Start Forcast</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;

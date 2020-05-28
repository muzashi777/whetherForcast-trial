import React from "react";
import axios from "axios";
import SearchFilter from "./searchFilter";
import countries from "./countries+states+cities.json";
import { Link } from "react-router-dom";
import logo from "../css/img/lucifer.png";

const Tables = (props) => (
  <tr>
    <td>{props.date}</td>
    <td>{props.sky}</td>
    <td>{props.temp}</td>
  </tr>
);

class StartForcast extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.selectOne = this.selectOne.bind(this);
    this.selectTwo = this.selectTwo.bind(this);
    this.state = {
      city: "Afghanistan",
      timeZone: 0,
      country: countries,
      home: [],
      homes: [],
      weather: {
        cod: "200",
        message: 0,
        cnt: 40,
        list: [
          {
            dt: 1578409200,
            main: {
              temp: 284.92,
              feels_like: 281.38,
              temp_min: 283.58,
              temp_max: 284.92,
              pressure: 1020,
              sea_level: 1020,
              grnd_level: 1016,
              humidity: 90,
              temp_kf: 1.34,
            },
            weather: [
              {
                id: 804,
                main: "Clouds",
                description: "overcast clouds",
                icon: "04d",
              },
            ],
            clouds: {
              all: 100,
            },
            wind: {
              speed: 5.19,
              deg: 211,
            },
            sys: {
              pod: "d",
            },
            dt_txt: "2020-01-07 15:00:00",
          },
        ],
      },
      weatherKey: "adb1bd7faf58030353fdd2711b4f184f",
    };
  }
  closePopup() {
    const modal = document.getElementById("table");
    modal.style.display = "none";
  }

  handlePopup() {
    const modal = document.getElementById("table");
    modal.style.display = "block";
  }

  handleClick() {
    const countyId = Number(document.getElementById("country").value);
    const stateId = Number(document.getElementById("select").value);
    const cityId = Number(document.getElementById("selectTwo").value);
    if (countyId === 0) {
      this.selectCountry();
    } else {
      if (stateId === 0) {
        this.fromCountry(countyId);
      } else if (cityId === 0) {
        this.fromState(stateId, countyId);
      } else {
        this.state.homes.forEach(async (item) => {
          if (item["id"] === cityId) {
            await this.setState({ city: item["name"] });
            this.getWeather(stateId, countyId);
          }
        });
      }
    }
  }
  fromCountry(countryId) {
    // const countryId = Number(document.getElementById("country").value);
    this.state.country.forEach(async (item) => {
      if (item["id"] === countryId) {
        await this.setState({ city: item["name"] });
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${this.state.weatherKey}`
          )
          .then((res) => {
            const persons = res.data;
            this.setState({ weather: persons });
            this.handlePopup();
          })
          .catch((err) => {
            if (err.response.status === 404) {
              console.log("Dont have this Country");
              this.noCountry();
            }
          });
      }
    });
  }
  fromState(stateId, countryId) {
    // const stateId = Number(document.getElementById("select").value);
    this.state.home.forEach(async (item) => {
      if (item["id"] === stateId) {
        await this.setState({ city: item["name"] });
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${this.state.weatherKey}`
          )
          .then((res) => {
            const persons = res.data;
            this.setState({ weather: persons });
            this.handlePopup();
          })
          .catch((err) => {
            if (err.response.status === 404) {
              console.log("Not Found From State, try Country Name");
              this.fromCountry(countryId);
            }
          });
      }
    });
  }

  getWeather(stateId, countryId) {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${this.state.weatherKey}`
      )
      .then((res) => {
        const persons = res.data;
        this.setState({ weather: persons });
        this.handlePopup();
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log("Not Found from Ciyt Name, try State");
          this.fromState(stateId, countryId);
        }
      });
  }

  selectCountry() {
    const text = document.querySelector(".selectCountry");
    text.style.display = "block";
    setTimeout(() => {
      text.style.display = "none";
    }, 1000);
  }

  noCountry() {
    const text = document.querySelector(".selectCountry");
    text.textContent = "Don't Have This Country In Forcasting Table";
    text.style.display = "block";
    setTimeout(() => {
      text.textContent = "Please Select country";
      text.style.display = "none";
    }, 1500);
  }

  async selectOne() {
    const countryId = Number(document.getElementById("country").value);
    const selectTwo = document.getElementById("selectTwo");
    await this.state.country.forEach((item) => {
      if (item["id"] === countryId) {
        return this.setState({ home: item["states"] });
      }
    });
    const select = document.getElementById("select");
    select.innerHTML = "";
    if (this.state.home[0] == null) {
      select.innerHTML = `<option value="">--No state in this Country--</option>`;
      selectTwo.innerHTML = `<option value="">--No City in this State--</option>`;
    } else {
      select.innerHTML += `<option value="">--None--</option>`;
      this.state.home.forEach((items) => {
        select.innerHTML += `<option value=${items["id"]}>${items["name"]}</option>`;
      });
      this.selectTwo();
    }
  }

  async selectTwo() {
    const street = Number(document.getElementById("select").value);

    await this.state.home.forEach((item) => {
      if (item["id"] === street) {
        return this.setState({ homes: item["cities"] });
      }
    });
    const selectTwo = document.getElementById("selectTwo");

    selectTwo.innerHTML = "";
    selectTwo.innerHTML = `<option value="">--None--</option>`;
    this.state.homes.forEach((item) => {
      selectTwo.innerHTML += `<option value=${item["id"]}>${item["name"]}</option>`;
    });
  }

  render() {
    return (
      <div>
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
                <Link to={"/about"}>About</Link>
              </li>
            </ul>
          </nav>

          <div className="start">
            <h1 className="selectCountry">Please Select country</h1>
            <br />
            <h1>Wheather Forcast</h1>
            <div>
              <section className="container-value">
                <label>Country</label>
                <br />
                <select onChange={this.selectOne} id="country">
                  <option value="">--Choose your Country--</option>
                  {this.state.country.map((item) => {
                    return (
                      <SearchFilter
                        key={item["id"]}
                        que={item["name"]}
                        id={item["id"]}
                      />
                    );
                  })}
                </select>
                <br />

                <label>State</label>
                <br />
                <select id="select" onChange={this.selectTwo}>
                  <option>--Choose your State--</option>
                </select>
                <br />
                <label>City</label>
                <br />
                <select id="selectTwo">
                  <option>--Choose your City--</option>
                </select>
              </section>
              <section className="container">
                <button onClick={this.handleClick}>Submit</button>
              </section>
            </div>
          </div>
        </div>
        <div id="table">
          <h2>
            {this.state.city}
            <span id="close" onClick={this.closePopup}>
              &times;
            </span>
          </h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Sky</th>
                <th>Temp.</th>
              </tr>
            </thead>
            <tbody>
              {this.state.weather["list"].map((item) => {
                return (
                  <Tables
                    date={item["dt_txt"]}
                    sky={item["weather"][0]["main"]}
                    temp={(item["main"]["temp"] - 272.15).toFixed(2)}
                    key={item["dt"]}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default StartForcast;

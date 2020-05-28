import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import StartForcast from "./component/startForcast";
import HomePage from "./component/homePage";
import About from "./component/about";

function App() {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/forcast" component={StartForcast} />
      <Route path="/about" component={About} />
    </Router>
  );
}

export default App;

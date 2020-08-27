import React, { Component } from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";

import MainPage from "./components/shared/MainPage/MainPage";
import Create from "./components/admin/Create/Create";
import HowTo from "./components/front/HowTo/HowTo";

export default class AppRouter extends Component {
  render() {
    return (
      <div className={!isHowtoFront ? "howto-admin" : ""}>
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/create" component={Create} />
            <Route path="/update/:name" component={Create} />
            <Route path="/how-to/:name" component={HowTo} />
          </Switch>
        </Router>
      </div>
    );
  }
}

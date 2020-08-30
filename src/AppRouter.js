import React, { Component } from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { setHowToList, getHowToStatus } from "./actions/index";

import MainPage from "./components/shared/MainPage/MainPage";
import Create from "./components/admin/Create/Create";
import HowTo from "./components/front/HowTo/HowTo";

class AppRouter extends Component {
  componentDidMount() {
    this.props.getHowToStatus();
    if (typeof howto !== "undefined" && howto.length > 0) {
      if (typeof howto === "string") {
        howto = JSON.parse(howto);
      }
      this.props.setHowToList(howto);
    }
  }
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

export default connect(null, {
  setHowToList,
  getHowToStatus,
})(AppRouter);

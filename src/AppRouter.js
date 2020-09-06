import React, { Component } from "react";
import { MemoryRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import MainPage from "./components/shared/MainPage/MainPage";
import Create from "./components/admin/Create/Create";
import HowTo from "./components/front/HowTo/HowTo";
import { TransitionGroup, CSSTransition } from "react-transition-group";


/**
 * Take out the switch to a different variable for wrapping it with withRouter
 * for passing the location param to the transition and switch
 */
const AnimatedSwitch = withRouter(({ location }) => (
  // <TransitionGroup>
  //   <CSSTransition
  //     key={location.key}
  //     classNames="slide"
  //     timeout={{ enter: 2000, exit: 1000 }}
  //   >
  <Switch location={location}>
    <Route exact path="/" component={MainPage} />
    <Route path="/create" component={Create} />
    <Route path="/update/:name" component={Create} />
    <Route path="/how-to/:name" component={HowTo} />
  </Switch>
  //   </CSSTransition>
  // </TransitionGroup>
));
class AppRouter extends Component {
  render() {
    return (
      <div className={`relative overflow-hidden ${!isHowtoFront ? "howto-admin" : ""}`}>
        <Router>
          <AnimatedSwitch />
        </Router>
      </div>
    );
  }
}

export default AppRouter;

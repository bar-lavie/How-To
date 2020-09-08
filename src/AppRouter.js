import React, { Component } from "react";
import { MemoryRouter as Router, Switch, Route, withRouter, Redirect } from "react-router-dom";
import MainPage from "./components/shared/MainPage/MainPage";
import Create from "./components/admin/Create/Create";
import HowTo from "./components/front/HowTo/HowTo";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Layout from "./components/shared/Layout/Layout";


/**
 * Take out the switch to a different variable for wrapping it with withRouter
 * for passing the location param to the transition and switch
 */
const routes = [
  { path: '/main', Component: MainPage },
  { path: '/create', Component: Create },
  { path: '/update/:name', Component: Create },
  { path: '/how-to/:name/', Component: HowTo },
]

const getLevelName = (pathname, level) =>
  pathname === "/" && level === 0
    ? "/"
    : pathname.split("/").filter(Boolean)[level];

const AnimatedSwitch = withRouter(({ location }) => {
  return (
    <TransitionGroup component={null}>
      <CSSTransition
        // getLevelName makes animation work only when
        // appropriate level in location.pathname changes
        // https://codesandbox.io/s/github/nodeTempest/react-transition-nested-routes-v2?file=/src/App.js:1126-1231
        key={getLevelName(location.pathname, 0)}
        classNames="page"
        timeout={300}
      >
        <Switch location={location}>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path}>
              <div className="page">
                <Component />
              </div>
            </Route>
          ))}
          <Redirect to="/main" />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
});
class AppRouter extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <AnimatedSwitch />
        </Router>
      </Layout>
    );
  }
}

export default AppRouter;

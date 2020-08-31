import React from "react";
import Button from "../../shared/UI/Button/Button";
import Step from "../Step/Step";
import ProgressBar from "../ProgressBar/ProgressBar";
import { setHowToStatus } from "../../../actions/index";

import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class HowTo extends React.Component {
  state = {
    name: null,
    permalink: null,
    steps: null,
    maxSteps: null,
    step: 1,
    isLoading: true,
  };

  componentDidMount() {
    const stepObj = Object.values(this.props.howTo).find(
      (element) => element.permalink === this.props.match.params.name
    );
    this.setState(
      {
        name: stepObj.name,
        permalink: stepObj.permalink,
        steps: stepObj.steps,
        maxSteps: stepObj.steps.length,
      },
      setTimeout(() => {
        this.setState({
          isLoading: false,
        });
      }, 3000)
    );
  }

  handleNextPrev = (move) => {
    if (this.state.step === this.state.maxSteps && move === "next") {
      return;
    }
    if (this.state.step === 1 && move === "prev") {
      return;
    }
    move = move === "next" ? this.state.step + 1 : this.state.step - 1;
    this.setState({
      step: move,
    });
    this.props.history.push(this.props.match.url + "/step-" + move);
  };
  handleBulletNav = (step) => {
    this.setState({
      step: step,
    });
    this.props.history.push(this.props.match.url + "/step-" + step);
  };

  handleDone = () => {
    if (!this.props.status.includes(this.state.permalink) && isHowtoFront) {
      this.props.setHowToStatus(this.state.permalink);
    }
    this.props.history.push("/");
  };

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Button navigateTo="/" type="primary">
            Back
          </Button>
          <div>
            <ProgressBar
              bullets={this.state.maxSteps}
              active={this.state.step}
              onClickHandle={(step) => this.handleBulletNav(step)}
            />
            <span className="text-3xl block text-center capitalize">
              {this.state.name}
            </span>
            <Switch>
              {this.state.steps.map((item, i) => (
                <Route
                  exact
                  path={`${this.props.match.url}/step-${i + 1}`}
                  render={(props) => (
                    <Step {...props} num={i + 1} data={item} />
                  )}
                  key={i + 1}
                />
              ))}
            </Switch>
            <div className="flex justify-between">
              <Button
                onClick={() => this.handleNextPrev("prev")}
                type="primary"
              >
                Back
              </Button>
              {this.state.step !== this.state.maxSteps ? (
                <Button
                  onClick={() => this.handleNextPrev("next")}
                  type="primary"
                >
                  Next
                </Button>
              ) : (
                <Button onClick={this.handleDone} type="primary">
                  Done
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    howTo: state.howto,
    status: state.status,
  };
};

export default connect(mapStateToProps, { setHowToStatus })(HowTo);

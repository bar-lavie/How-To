import React from "react";
import Button from "../../shared/UI/Button/Button";
import Step from "../Step/Step";
import ProgressBar from "../ProgressBar/ProgressBar";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class HowTo extends React.Component {
  state = {
    name: null,
    steps: null,
    maxSteps: null,
    step: 1,
    isLoading: true,
  };

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
  componentDidMount() {
    const stepObj = Object.values(this.props.howTo).find(
      (element) => element.permalink === this.props.match.params.name
    );
    this.setState(
      {
        name: stepObj.name,
        steps: stepObj.steps,
        maxSteps: stepObj.steps.length,
      },
      this.setState({
        isLoading: false,
      })
    );
  }

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
            <span>{this.state.name}</span>
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
                <Button navigateTo="/" type="primary">
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
  };
};
export default connect(mapStateToProps)(HowTo);

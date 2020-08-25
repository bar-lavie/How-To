import React from "react";
import Button from "../../shared/UI/Button/Button";

export default class Step extends React.Component {
  render() {
    // console.log(this.props.data);

    return <div>Step {this.props.num}</div>;
  }
}

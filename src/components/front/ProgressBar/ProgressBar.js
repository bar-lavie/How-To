import React from "react";

export default class ProgressBar extends React.Component {
  render() {
    let progressBullets = [];

    for (let i = 1; i <= this.props.bullets; i++) {
      progressBullets.push(
        <div
          onClick={() => this.props.onClickHandle(i)}
          key={i}
          className={`p-5 rounded-full bg-gray-400 relative cursor-pointer transition-colors duration-300 ${
            this.props.active === i || this.props.active > i
              ? "bg-green-500"
              : ""
          }`}
        >
          <span className="xy-align text-white">{i}</span>
        </div>
      );
    }
    let progressLineWidth =
      (100 / (this.props.bullets - 1)) * (this.props.active - 1) + "%";
    return (
      <>
        <div className="progress-bar flex justify-between relative">
          <div
            className="progress-line"
            style={{ width: progressLineWidth }}
          ></div>
          {progressBullets}
        </div>
      </>
    );
  }
}

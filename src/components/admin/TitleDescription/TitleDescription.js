import React from "react";

export default class TitleDescription extends React.Component {
  render() {
    return (
      <div className="flex flex-col">
        <input
          type="text"
          defaultValue={this.props.title}
          onChange={(e) =>
            this.props.onTitleDescriptionChangeHandler("title", e.target.value)
          }
        />
        <span className="block my-1"></span>
        <textarea
          defaultValue={this.props.description}
          onChange={(e) =>
            this.props.onTitleDescriptionChangeHandler(
              "content",
              e.target.value
            )
          }
        ></textarea>
      </div>
    );
  }
}

import React from "react";
import draftToHtml from 'draftjs-to-html';

export default class TitleDescription extends React.Component {
  render() {
    return (
      <div className="flex flex-col h-full">
        <input
          className="input"
          type="text"
          defaultValue={this.props.title}
          onChange={(e) =>
            this.props.onTitleChangeHandler(e.target.value)
          }
        />
        <span className="block my-1"></span>
        {/* <textarea
          defaultValue={this.props.description}
          onChange={(e) =>
            this.props.onTitleDescriptionChangeHandler(
              "content",
              e.target.value
            )
          }
          className="input h-full"
        ></textarea> */}
        <div className="input cursor-pointer h-full overflow-y-scroll"
          onClick={this.props.onSelectDescriptionEditHandler}
          dangerouslySetInnerHTML={{ __html: typeof this.props.description === 'string' ? this.props.description : draftToHtml(this.props.description) }}>
        </div>

      </div>
    );
  }
}

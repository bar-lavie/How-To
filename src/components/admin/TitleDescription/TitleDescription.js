import React from "react";
// import { EditorState, ContentState, convertFromHTML } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";

export default class TitleDescription extends React.Component {
  // state = {
  //   editorState: "",
  // };
  // componentDidMount() {
  //   let description = EditorState.createWithContent(
  //     ContentState.createFromBlockArray(convertFromHTML(this.props.description))
  //   );

  //   this.setState((prevState) => ({
  //     editorState: description,
  //   }));
  // }

  // onEditorStateChange = (editorState) => {
  //   this.setState({
  //     editorState,
  //   });
  //   this.props.onTitleDescriptionChangeHandler("content", editorState);
  // };
  render() {
    return (
      <div className="flex flex-col h-full">
        <input
          className="input"
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
          className="input h-full"
        ></textarea>
        {/* <Editor
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbarClassName="hidden"
          onEditorStateChange={this.onEditorStateChange}
        /> */}
      </div>
    );
  }
}

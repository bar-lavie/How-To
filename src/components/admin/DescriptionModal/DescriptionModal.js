import React from "react";
import { EditorState, ContentState, convertFromRaw, convertToRaw, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { ReactComponent as X } from "./x.svg";
import Button from "../../shared/UI/Button/Button";
// https://hashnode.com/post/what-is-the-recommended-way-of-storing-the-content-from-draftjs-in-a-database-cj2zw3sxn002uelk8k9sr51xe

export default class DescriptionModal extends React.Component {

  state = {
    editorState: "",
  };
  componentDidMount() {
    let description;


    if (typeof this.props.description === 'string') {
      description = EditorState.createWithContent(
        // ContentState.createFromText(this.props.description)
        ContentState.createFromBlockArray(convertFromHTML(this.props.description))
      );
    } else {
      description = EditorState.createWithContent(
        convertFromRaw(this.props.description)
      );

    }

    this.setState((prevState) => ({
      editorState: description,
    }));
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });

  };

  onDoneEditing = () => {
    const content = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.onDescriptionModalCloseHandler(content);
  }

  render() {
    return (
      <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">

        <div className="absolute w-full h-full bg-gray-900 opacity-50 rounded-md"></div>

        <button
          className="absolute text-white flex justify-center items-center p-4 opacity-75 bg-gray-900 cursor-pointer focus:outline-none border-none rounded-full outline-none hover:opacity-100"
          style={{ top: '1rem', right: '1rem' }}
          onClick={() => { this.props.onDescriptionModalCloseHandler(false) }}
        >
          <X className="w-4 h-4 xy-align" />
        </button>

        <div className="bg-white p-2 rounded-md relative z-10 w-9/12">
          <Editor
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
            editorClassName="overflow-y-scroll"
            editorStyle={{ height: '160px' }}
            toolbar={{ options: ['inline', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'remove', 'history'] }}
          />

          <div className="flex justify-end mt-4">
            <Button type="primary" onClick={this.onDoneEditing}>Save</Button>
          </div>
        </div>

      </div>

    );
  }
}

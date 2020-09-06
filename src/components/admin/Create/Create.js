import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Button from "../../shared/UI/Button/Button";
import TitleDescription from "../TitleDescription/TitleDescription";
import ImageUpload from "../ImageUpload/ImageUpload";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReactComponent as Remove } from "./remove.svg";
import DescriptionModal from '../DescriptionModal/DescriptionModal'
import { CSSTransition } from 'react-transition-group'

/**
 * DND source:
 * https://codesandbox.io/s/k260nyxq9v?file=/index.js:551-567
 */

class Create extends React.Component {
  state = {
    isUpdate: false,
    steps: [],
    descriptionModal: {
      isOpen: false,
      currentDescriptionEdit: null,
      currentDescriptionIndex: null,
    }
  };

  componentDidMount() {
    const isUpdate = this.props.match.path.includes("update");

    if (isUpdate) {
      const stepObj = Object.values(this.props.howTo).find(
        (element) => element.permalink === this.props.match.params.name
      );
      this.setState({
        isUpdate: true,
        name: stepObj.name,
        shortcode: stepObj.shortcode,
        steps: [...stepObj.steps],
      });
    } else {
      this.setState({
        steps: [this.stepPlaceholder],
      });
    }
  }

  // ************************
  // CRUD
  // ************************

  onTitleChange = (value, index) => {
    // // 1. Make a shallow copy of the items
    // let steps = [...this.state.steps];
    // // 2. Make a shallow copy of the item you want to mutate
    // let step = { ...steps[index] };
    // // 3. Replace the property you're intested in
    // step[type] = value;
    // // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    // steps[index] = step;
    // // 5. Set the state to our new copy
    // this.setState({ steps });
    let steps = [...this.state.steps]
    steps[index].title = value
    this.setState({ steps })
  };
  onImageChange = (src, index) => {
    let steps = [...this.state.steps];
    let step = { ...steps[index] };
    step.img = src;
    steps[index] = step;
    this.setState({ steps });
  };
  onUpdateName = (e) => {
    const value = e.target.value;
    this.setState({ name: value });
  };
  onAddStep = () => {
    let nextStep = { ...this.stepPlaceholder };
    nextStep.id = this.uid();
    this.setState((prevState) => ({
      steps: [...prevState.steps, nextStep],
    }));
  };
  onRemoveStep = (index) => {
    let steps = [...this.state.steps];
    steps.splice(index, 1);
    this.setState({ steps });
  };
  onDeleteHowto = () => {
    let form_data = new FormData();
    form_data.append("action", "howto_delete");
    form_data.append("shortcode", this.state.shortcode);

    axios.post(ajaxurl, form_data).then(function (response) {
      let res = response.data;
      if (res.success) {
        window.location.reload();
      }
    });
  };
  onSaveHowTo = () => {
    let form_data = new FormData();

    if (this.state.isUpdate) {
      form_data.append("action", "howto_update");
      form_data.append("name", this.state.name);
      form_data.append("shortcode", this.state.shortcode);
    } else {
      form_data.append("action", "howto_create");
      form_data.append("name", this.props.name);
    }

    form_data.append("data", JSON.stringify(this.state.steps));
    axios.post(ajaxurl, form_data).then(function (response) {
      let res = response.data;
      if (res.success) {
        window.location.reload();
      }
    });
  };

  // ************************
  // Description modal
  // ************************
  onSelectDescriptionEdit = (i) => {
    let descriptionModal = { ...this.state.descriptionModal }
    descriptionModal.currentDescriptionEdit = this.state.steps[i].content;
    descriptionModal.currentDescriptionIndex = i;
    descriptionModal.isOpen = true;
    this.setState({ descriptionModal })
  }

  onDescriptionModalClose = (newDescription = '') => {
    if (newDescription) {
      let steps = [...this.state.steps]
      steps[this.state.descriptionModal.currentDescriptionIndex].content = newDescription
      this.setState({ steps })
    }

    let descriptionModal = { ...this.state.descriptionModal }
    descriptionModal.currentDescriptionEdit = null;
    descriptionModal.currentDescriptionIndex = null;
    descriptionModal.isOpen = false;

    this.setState({ descriptionModal })
  }

  // ************************
  // DND
  // ************************
  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const steps = this.reorder(
      this.state.steps,
      result.source.index,
      result.destination.index
    );

    this.setState({
      steps,
    });
  };

  reorder = (steps, startIndex, endIndex) => {
    const result = Array.from(steps);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  stepPlaceholder = {
    id: this.uid(),
    img: "",
    title: "I am an example step title, Edit me first!",
    content:
      "<p>I am an example step description, <b>Edit me next!</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
  };

  render() {
    return (
      <div className="">
        <Button navigateTo="/" type="secondary">
          Back
        </Button>
        <div className="py-8">
          <div className="mb-8 flex justify-between items-center">
            {this.state.isUpdate && (
              <span className="text-2xl flex items-center">
                Updating{" "}
                <input
                  className="input text-2xl w-full max-w-xs mx-2"
                  defaultValue={this.state.name}
                  onChange={this.onUpdateName}
                />
              </span>
            )}
            {!this.state.isUpdate && (
              <span className="text-2xl">{this.props.name}</span>
            )}
            {this.state.shortcode && <Button type="danger" onClick={this.onDeleteHowto}>
              Delete
            </Button>}

          </div>
          <span className="block my-4"></span>
          {this.state.steps.length > 0 && (
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    className="create-steps-wrapper"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {this.state.steps.map((item, i) => (
                      <Draggable key={item.id} draggableId={item.id} index={i}>
                        {(provided, snapshot) => (
                          <div
                            key={i}
                            className="step-wrapper overflow-hidden flex items-center"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="p-4 md:p-8 w-1/5 h-32">
                              <div className="flex items-center h-full">
                                <span className="block text-lg font-bold">
                                  <span className="hidden md:inline">Step</span>{" "}
                                  {i + 1}
                                </span>
                                <span className="block border-0 border-l border-solid border-gray-400 mx-2 py-3"></span>
                                <button
                                  className="relative text-white flex justify-center items-center p-4 opacity-75 bg-gray-900 cursor-pointer focus:outline-none border-none rounded-full outline-none hover:opacity-100"
                                  onClick={() => this.onRemoveStep(i)}
                                >
                                  <Remove className="w-4 h-4 xy-align" />
                                </button>
                              </div>
                            </div>
                            <div className="p-4 md:p-8 w-3/5 h-32">
                              <TitleDescription
                                onTitleChangeHandler={(
                                  value
                                ) =>
                                  this.onTitleChange(value, i)
                                }
                                onSelectDescriptionEditHandler={() => { this.onSelectDescriptionEdit(i) }}
                                title={item.title}
                                description={item.content}
                              />
                            </div>
                            <div className="p-4 md:p-8 w-1/5 h-32">
                              <ImageUpload
                                onImageChangeHandler={(src) =>
                                  this.onImageChange(src, i)
                                }
                                image={item.img}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
        <div className="flex justify-between items-center">
          <Button type="primary" onClick={this.onAddStep}>
            Add Step
          </Button>
          <Button
            type="primary"
            onClick={this.onSaveHowTo}
            className={
              this.state.hasOwnProperty("name") && this.state.name.length < 2
                ? "pointer-events-none"
                : ""
            }
          >
            Save
          </Button>
        </div>
        <CSSTransition in={this.state.descriptionModal.isOpen} timeout={300} unmountOnExit classNames="my-node">
          <DescriptionModal description={this.state.descriptionModal.currentDescriptionEdit} onDescriptionModalCloseHandler={(newDescription) => { this.onDescriptionModalClose(newDescription) }} />
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.name,
    howTo: state.howto,
  };
};

export default connect(mapStateToProps)(Create);

import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Button from "../../shared/UI/Button/Button";
import TitleDescription from "../TitleDescription/TitleDescription";
import ImageUpload from "../ImageUpload/ImageUpload";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

/**
 * DND source:
 * https://codesandbox.io/s/k260nyxq9v?file=/index.js:551-567
 */

class Create extends React.Component {
  state = {
    isUpdate: false,
    steps: [],
  };

  stepPlaceholder = {
    id: "step-1",
    img: "",
    title: "I am an example step, Edit me first!",
    content:
      "This is my description, Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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

  onTitleDescriptionChange = (type, value, index) => {
    // 1. Make a shallow copy of the items
    let steps = [...this.state.steps];
    // 2. Make a shallow copy of the item you want to mutate
    let step = { ...steps[index] };
    // 3. Replace the property you're intested in
    step[type] = value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    steps[index] = step;
    // 5. Set the state to our new copy
    this.setState({ steps });
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

  saveHowTo = () => {
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

  addStep = () => {
    let nextStep = { ...this.stepPlaceholder };
    nextStep.id = `step-${this.state.steps.length + 1}`;
    this.setState((prevState) => ({
      steps: [...prevState.steps, nextStep],
    }));
  };
  onRemoveStep = (index) => {
    let steps = [...this.state.steps];
    steps.splice(index, 1);
    this.setState({ steps });
  };

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

  render() {
    return (
      <div>
        <Button navigateTo="/" type="primary">
          Back
        </Button>
        <div className="py-8">
          {this.state.isUpdate && (
            <span className="text-2xl flex items-center">
              Updating{" "}
              <input
                className="input focus:outline-none w-full mx-2"
                defaultValue={this.state.name}
                onChange={this.onUpdateName}
              />
            </span>
          )}
          {!this.state.isUpdate && (
            <span className="text-2xl">{this.props.name}</span>
          )}
          <span className="block my-4"></span>
          {this.state.steps.length > 0 && (
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    className="divide-y divide-gray-400"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {this.state.steps.map((item, i) => (
                      <Draggable key={item.id} draggableId={item.id} index={i}>
                        {(provided, snapshot) => (
                          <div
                            key={i}
                            className="overflow-hidden flex items-center divide-x divide-gray-400"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="px-8 py-4 h-40 flex items-center">
                              <span className="block mr-2">{i + 1}</span>
                              <Button
                                type="secondary"
                                onClick={() => this.onRemoveStep(i)}
                              >
                                Remove
                              </Button>
                            </div>
                            <div className="px-8 py-4 w-3/4 h-40">
                              <TitleDescription
                                onTitleDescriptionChangeHandler={(
                                  type,
                                  value
                                ) =>
                                  this.onTitleDescriptionChange(type, value, i)
                                }
                                title={item.title}
                                description={item.content}
                              />
                            </div>
                            <div className="px-8 py-4 w-1/4 h-40">
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
          <Button type="primary" onClick={this.addStep}>
            Add Step
          </Button>
          <Button
            type="primary"
            onClick={this.saveHowTo}
            className={
              this.state.hasOwnProperty("name") && this.state.name.length < 2
                ? "pointer-events-none"
                : ""
            }
          >
            Save
          </Button>
        </div>
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

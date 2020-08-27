import React from "react";
import { connect } from "react-redux";
import { setName, setHowToList } from "../../../actions/index";
import Button from "../UI/Button/Button";
import HowToBox from "../../front/HowToBox/HowToBox";

class MainPage extends React.Component {
  state = {
    isFront: false,
    howToList: [],
    search: true,
    show: "all",
    display: "list",
  };
  componentDidMount() {
    if (typeof howto !== "undefined" && howto.length > 0) {
      if (typeof howto === "string") {
        howto = JSON.parse(howto);
      }
      this.props.setHowToList(howto);
      this.setState((prevState) => ({
        howToList: howto,
      }));
    }
    if (typeof isHowtoFront !== "undefined") {
      this.setState((prevState) => ({
        isFront: isHowtoFront,
      }));
    }
  }
  handleInputChange = (e) => {
    let value = e.target.value;
    this.props.setName(value);
    this.setState((prevState) => ({
      howToList: [],
    }));
    if (howto.length > 0) {
      howto.forEach((item) => {
        let itemName = item.name.toLowerCase();
        if (itemName.includes(value)) {
          this.setState((prevState) => ({
            howToList: [...prevState.howToList, item],
          }));
        }
      });
    }
  };
  render() {
    let emptyHowTo = this.state.howToList.length === 0;

    const howTos = this.state.howToList.map((item) => (
      <HowToBox isFront={this.state.isFront} key={item.permalink} data={item} />
    ));

    return (
      <div className="flex flex-col items-center justify-center">
        {!this.state.isFront && (
          <div className="w-3/4 text-center mb-16">
            <h1 className="text-4xl mb-4">
              Welcome to How-To Wordpress plugin
            </h1>
            <p className="text-lg">
              This plugin allows you to create guides for your users and display
              them on the admin or your website
            </p>
          </div>
        )}
        <div>
          <span className="text-2xl">How to</span>
          <input
            className="input mx-2 w-64 text-2xl"
            placeholder="upload image"
            value={this.props.name ? this.props.name : ""}
            onChange={this.handleInputChange}
          />

          {emptyHowTo && !this.state.isFront ? (
            <Button
              className={this.props.name ? "" : "pointer-events-none"}
              navigateTo="/create"
              type="primary"
            >
              Create
            </Button>
          ) : (
            <span className="text-2xl">?</span>
          )}
        </div>

        {emptyHowTo ? (
          <div className="flex flex-col justify-center text-center mt-8">
            <span className="block mb-4">
              {this.state.isFront || this.props.name
                ? "No How-To's found..."
                : "You don't have any How-To's yet."}
            </span>
          </div>
        ) : (
          howTos
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.name,
  };
};

export default connect(mapStateToProps, { setName, setHowToList })(MainPage);

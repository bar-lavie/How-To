import React from "react";
import { connect } from "react-redux";
import { setName, setHowToList, getHowToStatus } from "../../../actions/index";
import Button from "../UI/Button/Button";
import HowToBox from "../../front/HowToBox/HowToBox";

class MainPage extends React.Component {
  state = {
    howToList: [],
    search: true,
    show: "all",
    display: "list",
  };
  componentDidMount() {
    this.props.getHowToStatus();
    if (typeof howto !== "undefined" && howto.length > 0) {
      if (typeof howto === "string") {
        howto = JSON.parse(howto);
      }
      this.props.setHowToList(howto);
      this.setState((prevState) => ({
        howToList: howto,
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
      this.props.howto.forEach((item) => {
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
      <HowToBox
        key={item.permalink}
        status={this.props.status.includes(item.permalink)}
        data={item}
      />
    ));

    return (
      <div className="flex flex-col items-center justify-center">
        {!isHowtoFront && (
          <div className="text-center mb-16">
            <span className="block font-black text-3xl mb-4 leading-normal">
              Welcome to How-To Wordpress plugin
            </span>
            <p className="text-sm">
              This plugin allows you to create guides for your users and display
              them on the admin or your website
            </p>
          </div>
        )}
        <div className="flex items-center">
          <span className="text-2xl">How to</span>
          <input
            className="input mx-2 w-64 text-2xl"
            placeholder="upload image"
            value={this.props.name ? this.props.name : ""}
            onChange={this.handleInputChange}
          />

          {!isHowtoFront ? (
            <Button
              className={
                this.props.name && emptyHowTo ? "" : "pointer-events-none"
              }
              navigateTo="/create"
              type={this.props.name && emptyHowTo ? "primary" : "secondary"}
            >
              Create
            </Button>
          ) : (
            <span className="text-2xl">?</span>
          )}
        </div>

        {!isHowtoFront && this.props.name && !emptyHowTo && (
          <span className="text-xs mt-4">
            It seems that you already have a How-to that matches your search
          </span>
        )}

        {emptyHowTo ? (
          <span className="block mt-10 mb-4">
            No How-To's found
            {!isHowtoFront && this.props.name ? " create one!" : "..."}
          </span>
        ) : (
          <div className="bg-gray-100 py-2 px-4 flex flex-col mt-8">
            {howTos}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.name,
    status: state.status,
    howto: state.howto,
  };
};

export default connect(mapStateToProps, {
  setName,
  setHowToList,
  getHowToStatus,
})(MainPage);

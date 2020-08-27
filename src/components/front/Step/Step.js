import React from "react";
import window from "./window.svg";
export default class Step extends React.Component {
  render() {
    let data = this.props.data;

    return (
      <div className="py-4">
        {data.img && (
          <div className="overflow-hidden rounded-lg border border-gray-400 mt-4 mb-8">
            <img src={pluginAppDirPath + window} />
            <img src={data.img} />
          </div>
        )}
        <div className="mb-8">
          <span className="text-xl block mb-8">{data.title}</span>
          <span className="text-sm block">{data.content}</span>
        </div>
      </div>
    );
  }
}

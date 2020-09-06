import React from "react";
import window from "./window.svg";
import draftToHtml from 'draftjs-to-html';

export default class Step extends React.Component {
  render() {
    let data = this.props.data;

    return (
      <div className="py-4">
        {data.img && (
          <a
            href={data.img}
            target="_blank"
            className="overflow-hidden block rounded-lg border border-gray-400 mt-4 mb-8"
          >
            <img src={pluginAppDirPath + window} />
            <img src={data.img} />
          </a>
        )}
        <div className="mb-8">
          <span className="text-xl block mb-8">{data.title}</span>
          <div className="block" dangerouslySetInnerHTML={{ __html: typeof data.content === 'string' ? data.content : draftToHtml(data.content) }}></div>
        </div>
      </div>
    );
  }
}

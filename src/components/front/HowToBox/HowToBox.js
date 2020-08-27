import React from "react";
import { Link } from "react-router-dom";

const HowToBox = (props) => (
  <Link
    to={
      isHowtoFront
        ? `/how-to/${props.data.permalink}/step-1`
        : `/update/${props.data.permalink}`
    }
    className="my-2 p-4 flex items-center bg-white w-64 no-underline text-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
  >
    <span className="p-4 mr-4 bg-gray-300 capitalize font-bold relative">
      <span className="xy-align">{props.data.name.charAt(0)}</span>
    </span>
    <span>
      <span className="capitalize text-md font-bold block">
        {props.data.name}
      </span>
      <span className="text-xs block">{props.data.steps.length} Steps</span>
    </span>

    {isHowtoFront && (
      <svg
        className={`w-2  ml-auto flex-shrink-0 ${
          props.status ? "text-green-500" : "text-gray-300"
        }`}
        viewBox="0 0 8 8"
        fill="currentColor"
      >
        <circle cx="4" cy="4" r="3" />
      </svg>
    )}
  </Link>
);
export default HowToBox;

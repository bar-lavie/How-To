import React from "react";
import { Link } from "react-router-dom";
/**
 * The right way export stateless component:
 * https://stackoverflow.com/questions/41695189/react-how-to-export-a-pure-stateless-component
 */
const Button = (props) => {
  let classNames =
    "px-2 py-1 rounded-md inline-block text-center no-underline hover:no-underline focus:outline-none border-none cursor-pointer leading-normal ";
  switch (props.type) {
    case "primary":
      classNames +=
        "bg-indigo-500 hover:bg-indigo-600 text-white hover:text-white";
      break;

    case "secondary":
      classNames += "bg-indigo-100 hover:bg-indigo-200 text-indigo-500";
      break;

    case "danger":
      classNames += "bg-red-500 hover:bg-red-600 text-white";
      break;

    default:
      break;
  }
  let moreClassNames = "";
  if (props.className) {
    moreClassNames += props.className;
  }
  return (
    <>
      {props.navigateTo ? (
        <Link
          className={classNames + " " + moreClassNames}
          onClick={props.onClick}
          to={props.navigateTo}
        >
          {props.children}
        </Link>
      ) : (
          <button
            className={classNames + " " + moreClassNames}
            onClick={props.onClick}
          >
            {props.children}
          </button>
        )}
    </>
  );
};

export default Button;

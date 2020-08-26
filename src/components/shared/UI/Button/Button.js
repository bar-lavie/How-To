import React from "react";
import { Link } from "react-router-dom";
/**
 * The right way export stateless component:
 * https://stackoverflow.com/questions/41695189/react-how-to-export-a-pure-stateless-component
 */
const Button = (props) => {
  let classNames =
    "px-2 py-1 rounded-md inline-block text-center no-underline hover:no-underline ";
  switch (props.type) {
    case "primary":
      classNames +=
        "bg-green-500 hover:bg-green-600 text-white hover:text-white";
      break;

    case "secondary":
      classNames += "bg-gray-100 hover:bg-gray-200 text-green-500";
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

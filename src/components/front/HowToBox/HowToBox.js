import React from "react";
import { Link } from "react-router-dom";

const HowToBox = (props) => (
  <Link
    to={
      props.isFront
        ? `/how-to/${props.data.permalink}/step-1`
        : `/update/${props.data.permalink}`
    }
    className="mt-4"
  >
    <span className="capitalize">{props.data.name}</span>
  </Link>
);
export default HowToBox;

import React from "react";

const RoundedButton = props => {

  return (
    <button className="dropdown__btn rounded__btn" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default RoundedButton;
import React from "react";

const RoundedButton = props => {

  const classes = "dropdown__btn rounded__btn " + props.className;

  return (
    <button className={classes.trim()} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default RoundedButton;
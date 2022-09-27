import React from "react";

const variants = {
  "primary": "btn--primary"
};

const Button = (props) => {

  return (
    <button className={"btn "+variants[props.color]}
      type={props.type} onClick={props.onClick}>
        {props.title}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
  color: "primary",
  title: "Button title",
  onClick: () => {}
};

export default Button;
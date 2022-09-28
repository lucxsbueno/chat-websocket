import React from "react";
import Spinner from "../default/Spinner";

const variants = {
  "primary": "btn--primary"
};

const Button = (props) => {

  const isLoading = props.loading
    ? <Spinner/>
    : props.title;

  return (
    <button className={"btn "+variants[props.color]}
      type={props.type} disabled={props.disabled} onClick={props.onClick}>
        {isLoading}
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
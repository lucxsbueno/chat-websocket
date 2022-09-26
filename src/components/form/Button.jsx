import React from "react";

const Button = (props) => {

  return (
    <button className="btn btn--primary"
      type={props.type} onClick={props.onClick}>
        {props.title}
    </button>
  )
}

Button.defaultProps = {
  title: "Button title",
  type: "button",
  onClick: () => {}
}

export default Button;
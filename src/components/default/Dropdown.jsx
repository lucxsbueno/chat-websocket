import React from "react";

const Dropdown = props => {

  return (
    <div className="dropdown">
      {props.button}
      <ul className="dropdown__nav">
        {props.children}
      </ul>
    </div>
  );
}

export default Dropdown;
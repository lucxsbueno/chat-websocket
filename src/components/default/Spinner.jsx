import React from "react";

const Spinner = ({color, className}) => {

  return(
    <div className={`spinner ${color === "primary" ? "spinner--primary" : ""} ${className}`}></div>
  );
}

export default Spinner;
import React from "react";

const Spinner = ({color}) => {

  return(
    <div className={`spinner ${color === "primary" ? "spinner--primary" : ""}`}></div>
  );
}

export default Spinner;
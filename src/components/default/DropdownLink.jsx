import React from "react";

import {
  Link
} from "react-router-dom";

const DropdownLink = props => {

  return (
    <li className="dropdown__item">
      <Link to={props.to} className="dropdown__link">
        {props.children}
      </Link>
    </li>
  );
}

export default DropdownLink;
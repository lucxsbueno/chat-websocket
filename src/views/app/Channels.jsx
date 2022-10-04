import React from "react";

import {
  useParams
} from "react-router-dom";

const Channels = () => {
  const params = useParams();

  return (
    <div className="app__header app__header--bg-03">
      <div className="d-flex flex-row align-center justify-center">
        <div className="avatar avatar--sm mr-20">
          <img className="avatar__img" alt="Profile user information" src="https://cdn.dribbble.com/users/230875/screenshots/12078079/media/c08285d2e039896a565cffeb5eb44a15.jpg?compress=1&resize=400x300&vertical=top"/>
        </div>
        <h2 className="p-sm fw-4">Tecnologia {params.id}</h2>
      </div>
      <div className="x-p-20 y-p-20">
      </div>
    </div>
  )
}

export default Channels;
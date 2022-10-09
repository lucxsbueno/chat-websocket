import React from "react";

import moment from "moment/moment";
import "moment/locale/pt-br";

const Default = props => {
  const { message } = props;

  moment.locale("pt-br");

  return (
    <div className="chat__message">
      <div className="d-flex flex-row">
        <div className="chat__avatar">
          <div className="chat__avatar__wrapper">
            <img className="chat__avatar__img" src={message.user.avatar} />
          </div>
        </div>

        <div className="chat__message__box">
          <span className="chat__username">
            {message.user.username} <span className="chat__message__hour">{"• " + moment(message.created_at).calendar()}</span>
          </span>
          <div className="chat__text__wrapper">
            <span className="chat__text">
              {message.body}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Default;
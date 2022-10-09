import React from "react"

import moment from "moment/moment";
import "moment/locale/pt-br";

const DefaultWithoutAvatar = props => {
  const { message } = props;

  moment.locale("pt-br");

  return (
    <div className="chat__message">
      <div className="d-flex flex-row">
        <div className="chat__avatar"></div>
        <div className="chat__message__box">
          <div className="chat__text__wrapper mt-0">
            <span className="chat__text">
              {message.body}
            </span>
          </div>
        </div>
        <div className="mt-10 ml-10 text-color chat__message__hour">
          {moment(message.created_at).calendar()}
        </div>
      </div>
    </div>
  );
}

export default DefaultWithoutAvatar;
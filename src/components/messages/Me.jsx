import React from "react";

import moment from "moment/moment";
import "moment/locale/pt-br";

const Me = props => {
  const { message } = props;

  moment.locale("pt-br");

  return (
    <div className="chat__message chat__message--me">
      <div className="d-flex flex-row-reverse">
        <div className="chat__message__box">
          <div className="chat__text__wrapper mt-0">
            <span className="chat__text">
              {message.body}
            </span>
          </div>
        </div>
        <div className="mt-10 ml-10 text-color chat__message__hour">
          {moment(Number(message.created_at)).calendar()}
        </div>
      </div>
    </div>
  );
}

export default Me;
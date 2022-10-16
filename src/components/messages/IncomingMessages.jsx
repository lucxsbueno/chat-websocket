import React from "react";

import moment from "moment/moment";

const IncomingMessages = props => {
  const message = props.message;

  return (
    <div className="chat__message">

      <div className="d-flex flex-row">

        <div className="chat__avatar">
          <div className="chat__avatar__wrapper">
            <img alt="" className="chat__avatar__img" src={message[1][0].user.avatar} />
          </div>
        </div>

        <div className="chat__messages_wrapper">

          <div className="chat__message__box">
            <span className="chat__username">
              <span className="fw-4">{message[1][0].user.name}</span> @{message[1][0].user.username} <span className="chat__message__hour">{"• " + moment(message[1][0].created_at).calendar().toLocaleLowerCase()}</span>
            </span>
            <div className="chat__text__wrapper">
              <span className="chat__text">
                {message[1][0].body}
              </span>
            </div>
          </div>

          {Object.values(message[1]).map((obj, index) => {
            const isFirst = index === 0;
            const marginTop = !isFirst
              ? "mt-10"
              : "";

            if (index === 0) {
              return null;
            }

            return (
              <div key={index} className={`d-flex flex-row ${marginTop}`.trim()}>
                <div className="chat__message__box">
                  <div className="chat__text__wrapper mt-0">
                    <span className="chat__text">
                      {obj.body}
                    </span>
                  </div>
                </div>
                <div className="mt-10 ml-10 text-color chat__message__hour">
                  {moment(obj.created_at).format("HH:mm")}
                </div>
              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default IncomingMessages;
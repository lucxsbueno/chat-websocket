import React from "react";

import moment from "moment/moment";

const SenderMessages = props => {
  const message = props.message;

  return (
    <div className="chat__message chat__message--me">
      {Object.values(message[1]).map((obj, index) => {
        const isFirst = index === 0;
        const marginTop = !isFirst
          ? "mt-10"
          : "";

        return (
          <div key={index} className={`d-flex flex-row-reverse ${marginTop}`.trim()}>
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
  );
}

export default SenderMessages;
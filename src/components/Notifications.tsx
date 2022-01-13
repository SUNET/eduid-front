import { translate } from "login/translation";
import React from "react";
import { Alert } from "reactstrap";
import { Message } from "reducers/Notifications";

interface NotificationsProps {
  messages: Message[];
  errors: Message[];
  debug: boolean;
  handleRMNotification: () => void;
}

function isString(translated: JSX.Element | string): translated is string {
  return (translated as string).indexOf !== undefined;
}

function Notifications(props: NotificationsProps) {
  let toShow = props.errors.map((err, index) => {
    let err_msg = translate(err.msg);
    // if (err.vals !== null) {
    //   err_msg = err_msg(err.vals);
    // }
    if (!props.debug && isString(err_msg) && err_msg.indexOf("UNKNOWN MESSAGE ID (") !== -1) {
      err_msg = translate("unexpected-problem");
    }
    return (
      <Alert
        key={index}
        color="danger"
        data-level="errors"
        data-index={index}
        isOpen={true}
        toggle={props.handleRMNotification}
      >
        <span>{err_msg}</span>
      </Alert>
    );
  });

  if (toShow.length === 0) {
    toShow = props.messages.map((msg, index) => {
      let success_msg = translate(msg.msg);
      // if (msg.vals !== null) {
      //   success_msg = success_msg(msg.vals);
      // }
      if (!props.debug && isString(success_msg) && success_msg.indexOf("UNKNOWN MESSAGE ID (") !== -1) {
        success_msg = translate("unexpected-success");
      }
      return (
        <Alert
          key={index}
          color="success"
          data-level="messages"
          data-index={index}
          isOpen={true}
          toggle={props.handleRMNotification}
        >
          <span>{success_msg}</span>
        </Alert>
      );
    });
  }
  return <div className="notifications-area">{toShow}</div>;
}

export default Notifications;

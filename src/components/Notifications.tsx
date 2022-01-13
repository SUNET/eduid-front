import { translate, UNKNOWN_MESSAGE } from "login/translation";
import React from "react";
import { Alert } from "reactstrap";
import { eduidNotification } from "reducers/Notifications";

interface NotificationsProps {
  message: eduidNotification;
  error: eduidNotification;
  debug: boolean;
  handleRMNotification: () => void;
}

function isString(translated: JSX.Element | string): translated is string {
  return (translated as string).indexOf !== undefined;
}

function Notifications(props: NotificationsProps) {
  // show errors first, regular messages second
  const show: eduidNotification = props.error || props.message;

  if (!show) {
    // no messages to show
    return null;
  }

  let msg = translate(show.message);
  if (!props.debug && isString(msg) && msg.startsWith(UNKNOWN_MESSAGE)) {
    if (show.level == "error") {
      msg = translate("unexpected-problem");
    } else {
      msg = translate("unexpected-success");
    }
  }

  return (
    <div className="notifications-area">
      <Alert color={show.level === "error" ? "danger" : "success"} toggle={props.handleRMNotification}>
        <span>{msg}</span>
      </Alert>
    </div>
  );
}

export default Notifications;

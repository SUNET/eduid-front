import { translate, UNKNOWN_MESSAGE } from "login/translation";
import React from "react";
import { Alert } from "reactstrap";
import { eduidNotification } from "reducers/Notifications";

interface NotificationsProps {
  info: eduidNotification;
  error: eduidNotification;
  debug: boolean;
  handleRMNotification: () => void;
}

function isString(translated: JSX.Element | string): translated is string {
  return (translated as string).indexOf !== undefined;
}

function Notifications(props: NotificationsProps) {
  // show errors first, information second
  const show: eduidNotification = props.error || props.info;

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
      <Alert
        color={show.level === "error" ? "danger" : "success"}
        toggle={props.handleRMNotification}
        closeClassName="close"
      >
        <span>{msg}</span>
      </Alert>
    </div>
  );
}

export default Notifications;

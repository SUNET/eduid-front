import { translate, UNKNOWN_MESSAGE } from "login/translation";
import React from "react";
import { IntlShape, useIntl } from "react-intl";
import { Alert } from "reactstrap";
import { eduidNotification, notificationLevel } from "reducers/Notifications";

interface NotificationsProps {
  info: eduidNotification;
  error: eduidNotification;
  debug: boolean;
  handleRMNotification: () => void;
}

export default function Notifications(props: NotificationsProps): JSX.Element | null {
  const intl = useIntl();

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

  const color = show.level === "error" ? "danger" : "success";
  const label = getLabel(intl, show.level);

  return (
    <div className="notifications-area" aria-live="polite">
      <Alert color={color} toggle={props.handleRMNotification} closeClassName="close">
        <span>
          <output aria-label={label}>{msg}</output>
        </span>
      </Alert>
    </div>
  );
}

function isString(translated: JSX.Element | string): translated is string {
  return (translated as string).indexOf !== undefined;
}

function getLabel(intl: IntlShape, level: notificationLevel): string {
  // aria-label can't be an Element, we need to get the actual translated string here
  if (level === "error") {
    return intl.formatMessage({
      id: "notifications.error-label",
      defaultMessage: "Error",
      description: "Notification type",
    });
  }
  return intl.formatMessage({
    id: "notifications.info-label",
    defaultMessage: "Information",
    description: "Notification type",
  });
}

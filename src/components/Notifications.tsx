import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect } from "react";
import { IntlShape, useIntl } from "react-intl";
import { Alert } from "reactstrap";
import { clearNotifications, eduidNotification, notificationLevel } from "slices/Notifications";
import { UNKNOWN_MESSAGE } from "translation";

export function Notifications(): JSX.Element | null {
  const debug = useDashboardAppSelector((state) => state.config.debug);
  const info = useDashboardAppSelector((state) => state.notifications.info);
  const error = useDashboardAppSelector((state) => state.notifications.error);
  const dispatch = useDashboardAppDispatch();

  const intl = useIntl();

  useEffect(() => {
    if (info && info?.message.endsWith("_success")) {
      dispatch(clearNotifications());
    }
  }, [info]);

  function handleRMNotification(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(clearNotifications());
  }

  // show errors first, information second
  const show: eduidNotification | undefined = error || info;

  if (!show) {
    // no messages to show
    return null;
  }

  let msg: string = intl.formatMessage({ id: show.message });
  if (!debug && isString(msg) && msg.startsWith(UNKNOWN_MESSAGE)) {
    if (show.level == "error") {
      msg = intl.formatMessage({
        id: "unexpected-problem",
        defaultMessage: `There was an unexpected problem servicing your request, please try again or contact 
        the site administrators`,
        description: "unexpected problem error",
      });
    } else {
      msg = intl.formatMessage({
        id: "unexpected-success",
        defaultMessage: "Success",
        description: "unexpected success message",
      });
    }
  }

  const color = show.level === "error" ? "danger" : "success";
  const label = getLabel(intl, show.level);

  return (
    <div className="notifications-area" aria-live="polite">
      <Alert color={color} toggle={handleRMNotification} closeClassName="close">
        <span className="horizontal-content-margin">
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

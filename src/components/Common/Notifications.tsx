import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { IntlShape, useIntl } from "react-intl";
import { clearNotifications, EduidNotification, notificationLevel } from "slices/Notifications";
import EduIDButton from "./EduIDButton";

export function Notifications(): React.JSX.Element | null {
  const info = useAppSelector((state) => state.notifications.info);
  const error = useAppSelector((state) => state.notifications.error);
  const dispatch = useAppDispatch();
  const intl = useIntl();

  useEffect(() => {
    if (info?.message.endsWith("_success")) {
      dispatch(clearNotifications());
    }
  }, [dispatch, info]);

  function handleRMNotification(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(clearNotifications());
  }

  // show errors first, information second
  const show: EduidNotification | undefined = error || info;

  if (!show) {
    // no messages to show
    return null;
  }

  // Direct lookup instead of intl.formatMessage() — babel-plugin-formatjs cannot statically evaluate dynamic IDs
  const msg: string = String(intl.messages[show.message] ?? show.message);

  const color = show.level === "error" ? "danger" : "success";
  const label = getLabel(intl, show.level);

  return (
    <div className="notifications-area" aria-live="polite">
      <div className={`alert alert-${color} alert-dismissible fade show`} role="alert">
        <span className="horizontal-content-margin">
          <output aria-label={label}>{msg}</output>
        </span>
        <EduIDButton buttonstyle="close" id="close-error" onClick={handleRMNotification} />
      </div>
    </div>
  );
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

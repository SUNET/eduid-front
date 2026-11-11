import { useAppDispatch } from "eduid-hooks";
import { detectBrowserSupport } from "helperFunctions/browserSupport";
import { useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { showNotification } from "slices/Notifications";

const NOTICE_SHOWN_KEY = "browserSupportNoticeShown";

/**
 * Warns the user, through the regular notification bar, when the browser lacks features eduID needs.
 * Renders nothing. Shown at most once per browser session, so redirects between eduID and the
 * login/dashboard services don't repeat it.
 *
 * Note that this can only run in a browser that can load the app at all.
 */
export function BrowserSupportCheck() {
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) {
      return;
    }
    done.current = true;

    try {
      if (sessionStorage.getItem(NOTICE_SHOWN_KEY)) {
        return;
      }
    } catch {
      // storage unavailable, show the notice
    }

    const { unsupported, noWebauthn } = detectBrowserSupport();
    const parts: string[] = [];
    if (unsupported) {
      parts.push(
        intl.formatMessage({
          id: "browserSupport.unsupported",
          defaultMessage:
            "Your browser may not work well with eduID. Parts of eduID may look wrong or not work at all. Please update your browser, or try another, up to date browser.",
          description: "Notification shown when the browser lacks features eduID needs",
        }),
      );
    }
    if (noWebauthn) {
      parts.push(
        intl.formatMessage({
          id: "browserSupport.noWebauthn",
          defaultMessage: "Security keys and passkeys are not supported by this browser.",
          description: "Notification shown when the browser has no WebAuthn support",
        }),
      );
    }
    if (parts.length === 0) {
      return;
    }

    dispatch(showNotification({ level: "info", message: parts.join(" ") }));
    try {
      sessionStorage.setItem(NOTICE_SHOWN_KEY, "1");
    } catch {
      // ignore
    }
  }, [dispatch, intl]);

  return null;
}

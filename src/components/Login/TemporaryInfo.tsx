import EduIDButton from "components/Common/EduIDButton";
import { Fragment, useState } from "react";
import { FormattedMessage } from "react-intl";
import { HAS_READ_ANNOUNCEMENT } from "./Login";

export default function TemporaryInfo(props: {
  readonly setHasReadAnnouncement: (key: boolean) => void;
}): React.JSX.Element {
  const [activeButton, setActiveButton] = useState<boolean>(false);

  function handleAccept() {
    window.localStorage.setItem(HAS_READ_ANNOUNCEMENT, "true");
    props.setHasReadAnnouncement(Boolean(window.localStorage.getItem(HAS_READ_ANNOUNCEMENT)));
    if (!activeButton) {
      window.localStorage.removeItem(HAS_READ_ANNOUNCEMENT);
    }
  }

  return (
    <Fragment>
      {/* Common for all messages */}
      <h1>
        <FormattedMessage defaultMessage="Important information" description="Temp info - title" />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage="The information below is relevant to you and we need confirmation that you have taken part of it. Please read before you press continue."
            description="Temp info - lead"
          />
        </p>
      </div>

      {/* Unique situation message */}
      <div className="notice-box">
        <h2>
          <FormattedMessage
            defaultMessage="We are discontinuing phone number support"
            description="Temp info - heading"
          />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="Soon it will not be possible to use phone numbers to verify identity and resetting password."
            description="Temp info - message1"
          />
        </p>
        <p>
          <FormattedMessage
            defaultMessage="Already verified identities will not be affected by this change."
            description="Temp info - message2"
          />
        </p>

        <p>
          <FormattedMessage
            defaultMessage="To ensure continued safe access and use of eduID, we recommend you choose a different method for password reset, such as using a security key."
            description="Temp info - message4"
          />
        </p>
        <span className="help-text">
          <FormattedMessage
            defaultMessage={`For more information about supported means of verification, please visit {help} and refer to the 'Verification of identity' section and 'Improving your security level of eduID' section.`}
            description="Temp info - message5"
            values={{
              help: (
                <a className="text-link" href="https://www.eduid.se/help" target="_blank" rel="noreferrer">
                  eduid.se/help
                </a>
              ),
            }}
          />
        </span>
        {/* an empty p tag for padding bottom effect for the notice box */}
        <p></p>
      </div>

      {/* "Don't show again" checkbox and "Continue" button */}
      <div className="buttons-center">
        <label htmlFor="show-check">
          <input
            type="checkbox"
            id="show-check"
            name="show-check"
            checked={activeButton}
            onChange={() => setActiveButton(!activeButton)}
          />
          <span>
            <FormattedMessage defaultMessage="Don't show this message again" description="Temp info - checkbox" />
          </span>
        </label>

        <EduIDButton type="submit" buttonstyle="primary" onClick={handleAccept} id="continue-button">
          <FormattedMessage defaultMessage="Continue" description="Temp info - continue button" />
        </EduIDButton>
      </div>
    </Fragment>
  );
}

import EduIDButton from "components/Common/EduIDButton";
import { Fragment, useState } from "react";
import { FormattedMessage } from "react-intl";
import { HAS_READ_ANNOUNCEMENT } from "./Login";

export default function TemporaryInfo(props: { readonly setHasReadAnnouncement: (key: boolean) => void }): JSX.Element {
  const [activeButton, setActiveButton] = useState<boolean>(false);

  function handleAccept() {
    window.localStorage.setItem(HAS_READ_ANNOUNCEMENT, "true");
    props.setHasReadAnnouncement(Boolean(window.localStorage.getItem(HAS_READ_ANNOUNCEMENT)));
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
            defaultMessage="We're discontinuing phone number support on November 10th"
            description="Temp info - heading"
          />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="As an important step in improving the security of eduID, we will soon discontinue the use of phone numbers for verifying identity and resetting passwords."
            description="Temp info - message"
          />
        </p>
        <p>
          <FormattedMessage
            defaultMessage="To ensurer continued safe access and use of eduID, we recommend that you choose another verification method."
            description="Temp info - message"
          />
        </p>
        <p>
          <FormattedMessage
            defaultMessage={`For more information about supported means of verification, please visit {help} and refer to the 'Verification of identity' section.`}
            description="Temp info - message"
            values={{
              help: (
                <a className="text-link" href="https://www.eduid.se/help" target="_blank">
                  eduid.se/help
                </a>
              ),
            }}
          />
        </p>
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

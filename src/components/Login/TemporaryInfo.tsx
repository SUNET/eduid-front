import EduIDButton from "components/Common/EduIDButton";
import { Fragment, useState } from "react";
import { FormattedMessage } from "react-intl";

export default function TemporaryInfo(props: {
  hasReadAnnouncement: boolean;
  setHasReadAnnouncement: (key: boolean) => void;
}): JSX.Element {
  const [activeButton, setActiveButton] = useState<boolean>(false);

  async function handleAccept() {
    if (activeButton) {
      props.setHasReadAnnouncement(true);
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
            defaultMessage="We're no longer supporting phone verification"
            description="Temp info - heading"
          />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="As an important step in improving the security of eduID we will shortly discontinue the use of phone numbers as a means of:"
            description="Temp info - message"
          />
        </p>
        <ul className="bullets">
          <li>verifying identity</li>
          <li>resetting password</li>
        </ul>

        <p>
          <FormattedMessage
            defaultMessage="This change may affect your current verification methods. As an alternative, we recommend verifying:"
            description="Temp info - message"
          />
        </p>
        <ul className="bullets">
          <li>with a security key</li>
          <li>with BankID</li>
          <li>with Freja+</li>
          <li>with eIDAS</li>
        </ul>
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

        <EduIDButton
          disabled={!props.hasReadAnnouncement}
          type="submit"
          buttonstyle="primary"
          onClick={handleAccept}
          id="continue-button"
        >
          <FormattedMessage defaultMessage="Continue" description="Temp info - continue button" />
        </EduIDButton>
      </div>
    </Fragment>
  );
}

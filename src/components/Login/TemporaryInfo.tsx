import EduIDButton from "components/Common/EduIDButton";
import { Fragment, useState } from "react";
import { FormattedMessage } from "react-intl";

export default function TemporaryInfo(props: { readonly setHasReadAnnouncement: (key: boolean) => void }): JSX.Element {
  const [activeButton, setActiveButton] = useState<boolean>(false);

  function handleAccept() {
    window.localStorage.setItem("hasReadAnnouncement", "true");
    props.setHasReadAnnouncement(Boolean(window.localStorage.getItem("hasReadAnnouncement")));
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
          <li>
            <FormattedMessage defaultMessage="Verifying identity" description="Temp info - list item1" />
          </li>
          <li>
            <FormattedMessage defaultMessage="Resetting password" description="Temp info - list item2" />
          </li>
        </ul>

        <p>
          <FormattedMessage
            defaultMessage="This change may affect your current verification methods. As an alternative, we recommend verifying:"
            description="Temp info - message"
          />
        </p>
        <ul className="bullets">
          <li>
            <FormattedMessage defaultMessage="With Bank ID" description="Temp info - list item3" />
          </li>
          <li>
            <FormattedMessage defaultMessage="With Freja+" description="Temp info - list item4" />
          </li>
          <li>
            <FormattedMessage defaultMessage="With eIDAS" description="Temp info - list item5" />
          </li>
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

        <EduIDButton type="submit" buttonstyle="primary" onClick={handleAccept} id="continue-button">
          <FormattedMessage defaultMessage="Continue" description="Temp info - continue button" />
        </EduIDButton>
      </div>
    </Fragment>
  );
}

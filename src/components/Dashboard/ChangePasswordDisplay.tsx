import EduIDButton from "components/Common/EduIDButton";
import NotificationModal from "components/Common/NotificationModal";
import { useIndexAppSelector as useDashboardAppSelector } from "index-hooks";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

interface ChangePasswordDisplayProps {
  showModal?: boolean;
}

function ChangePasswordDisplay(props: ChangePasswordDisplayProps) {
  const [showModal, setShowModal] = useState<boolean>(props.showModal === true);
  const config = useDashboardAppSelector((state) => state.config);

  function handleAcceptModal() {
    const chpassURL = config.authn_url + "chpass";
    // the "chpass" path will route to the ChangePasswordContainer when we get back
    const nextURL = config.dashboard_link + "chpass";
    const url = chpassURL + "?next=" + encodeURIComponent(nextURL);

    window.location.assign(url);
  }

  return (
    <article>
      <div id="change-password-container">
        <h2>
          <FormattedMessage defaultMessage="Change password" description="Dashboard change password" />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="Click the link to change your eduID password."
            description="Dashboard change password link description text"
          />
        </p>
        <EduIDButton
          id="security-change-button"
          buttonstyle="link"
          className="lowercase"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <FormattedMessage defaultMessage="Change password" description="Dashboard change password button text" />
        </EduIDButton>
      </div>

      <NotificationModal
        id="security-confirm-modal"
        title={
          <FormattedMessage
            defaultMessage="For security reasons..."
            description="Dashboard change password modal title"
          />
        }
        mainText={
          <FormattedMessage
            defaultMessage="You will need to log in again to change your password."
            description="Dashboard change password modal main text"
          />
        }
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
        acceptModal={handleAcceptModal}
        acceptButtonText={<FormattedMessage defaultMessage="Accept" description="accept button" />}
      />
    </article>
  );
}

export default ChangePasswordDisplay;

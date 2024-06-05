import EduIDButton from "components/Common/EduIDButton";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

interface ChangePasswordDisplayProps {
  showModal?: boolean;
}

function ChangePasswordDisplay(props: ChangePasswordDisplayProps) {
  const [showModal, setShowModal] = useState<boolean>(props.showModal === true);
  const navigate = useNavigate();

  function handleAcceptModal() {
    const newUrl = "/profile/chpass/";
    navigate(newUrl);
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
            navigate("/profile/chpass/");
          }}
        >
          <FormattedMessage defaultMessage="Change password" description="Dashboard change password button text" />
        </EduIDButton>
      </div>

      {/* <NotificationModal
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
      /> */}
    </article>
  );
}

export default ChangePasswordDisplay;

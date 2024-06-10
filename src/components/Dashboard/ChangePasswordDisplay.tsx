import { fetchSuggestedPassword } from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch } from "eduid-hooks";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { clearNotifications } from "slices/Notifications";
import { AuthenticateModal } from "./Authenticate";
import { finish_url } from "./ChangePassword";

function ChangePasswordDisplay() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  async function handleSuggestedPassword() {
    const response = await dispatch(fetchSuggestedPassword());
    if (fetchSuggestedPassword.rejected.match(response)) {
      if ((response.payload as any)?.payload.message === "authn_status.must-authenticate") {
        dispatch(clearNotifications());
        setShowModal(true);
      } else navigate(finish_url);
    }
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
          onClick={handleSuggestedPassword}
        >
          <FormattedMessage defaultMessage="Change password" description="Dashboard change password button text" />
        </EduIDButton>
      </div>
      <AuthenticateModal action="changepwAuthn" dispatch={dispatch} showModal={showModal} setShowModal={setShowModal} />
    </article>
  );
}

export default ChangePasswordDisplay;

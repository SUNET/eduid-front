import { fetchSuggestedPassword } from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch } from "eduid-hooks";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { AuthenticateModal } from "./Authenticate";

function ChangePasswordDisplay() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  async function handleSuggestedPassword() {
    const response = await dispatch(fetchSuggestedPassword());
    if (fetchSuggestedPassword.fulfilled.match(response)) {
      navigate("/profile/chpass");
    } else if (fetchSuggestedPassword.rejected.match(response)) {
      if ((response.payload as any)?.payload.message === "authn_status.must-authenticate") {
        setShowModal(true);
      }
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
      <AuthenticateModal
        action="changepwAuthn"
        dispatch={dispatch}
        showModal={showModal}
        setShowModal={setShowModal}
        mainText={
          <FormattedMessage
            defaultMessage="You will need to log in again to change your password."
            description="Dashboard change password modal main text"
          />
        }
      />
    </article>
  );
}

export default ChangePasswordDisplay;

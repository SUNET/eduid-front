import { fetchSuggestedPassword } from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch } from "eduid-hooks";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

function ChangePasswordDisplay() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleSuggestedPassword() {
    const response = await dispatch(fetchSuggestedPassword());
    if (fetchSuggestedPassword.fulfilled.match(response)) {
      navigate("/profile/chpass");
    }
  }
  return (
    <article id="change-password">
      <h2>
        <FormattedMessage defaultMessage="Change password" description="Dashboard change password" />
      </h2>
      <p>
        <FormattedMessage
          defaultMessage="Click the link to change your eduID password."
          description="Dashboard change password link description text"
        />
      </p>
      <EduIDButton id="security-change-button" buttonstyle="link lowercase" onClick={handleSuggestedPassword}>
        <FormattedMessage defaultMessage="Change password" description="Dashboard change password button text" />
      </EduIDButton>
    </article>
  );
}

export default ChangePasswordDisplay;

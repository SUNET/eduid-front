import EduIDButton from "components/Common/EduIDButton";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

function ChangePasswordDisplay() {
  const navigate = useNavigate();

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
    </article>
  );
}

export default ChangePasswordDisplay;

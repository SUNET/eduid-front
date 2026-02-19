import securityApi from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import { ToolTip } from "components/Common/ToolTip";
import { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";

function ChangePasswordDisplay() {
  const navigate = useNavigate();
  const [fetchSuggestedPassword] = securityApi.useLazyFetchSuggestedPasswordQuery();

  const handleSuggestedPassword = useCallback(async () => {
    const response = await fetchSuggestedPassword();
    if (response.isSuccess) {
      navigate("/profile/chpass");
    }
  }, [fetchSuggestedPassword, navigate]);

  return (
    <article id="change-password">
      <div className="flex-between baseline">
        <h2>
          <FormattedMessage defaultMessage="Change password" description="Dashboard change password" />
        </h2>
        <ToolTip />
      </div>
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

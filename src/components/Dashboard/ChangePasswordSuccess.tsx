import { ConfirmUserInfo, EmailFieldset } from "components/Common/ConfirmUserInfo";
import EduIDButton from "components/Common/EduIDButton";
import Splash from "components/Common/Splash";
import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";
import { finish_url } from "./ChangePassword";

export function ChangePasswordSuccess(): JSX.Element {
  const emails = useAppSelector((state) => state.emails.emails);
  const location = useLocation();
  const password = location.state.password;
  const isSuggested = location.state.isSuggested;
  const is_loaded = useAppSelector((state) => state.app.is_loaded);
  let email = "";
  if (emails.length) {
    email = emails?.filter((mail) => mail.primary)[0].email || "";
  }

  return (
    <Splash showChildren={is_loaded}>
      <form method="GET" action={finish_url}>
        <section className="intro">
          <h1>
            <FormattedMessage
              defaultMessage="Change Password: Completed"
              description="Change password set new password success heading"
            />
          </h1>
          <div className="lead">
            <p>
              <FormattedMessage
                defaultMessage={`You have successfully updated your password. Make sure to store your password securely for future use.`}
                description="Change password set new password success lead"
              />
            </p>
          </div>
        </section>

        {!isSuggested ? (
          <div className="email-display">
            <EmailFieldset email={email} />
          </div>
        ) : (
          <ConfirmUserInfo email_address={email} new_password={password} />
        )}
        <div className="buttons">
          <EduIDButton id="change-password-finished" buttonstyle="link normal-case" type="submit">
            <FormattedMessage defaultMessage="Go to dashboard" description="Go to dashboard" />
          </EduIDButton>
        </div>
      </form>
    </Splash>
  );
}

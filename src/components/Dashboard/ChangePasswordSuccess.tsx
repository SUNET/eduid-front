import { ConfirmUserInfo } from "components/Common/ConfirmUserInfo";
import EduIDButton from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";
import { finish_url } from "./ChangePassword";

export function ChangePasswordSuccess(): JSX.Element {
  const emails = useAppSelector((state) => state.emails.emails);
  const location = useLocation();
  const password = location.state;
  const state = useAppSelector((state) => state.signup.state);

  return (
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
              defaultMessage={`These is your new password for eduID. Make sure to store your password securely for future use`}
              description="Change password set new password success lead"
            />
          </p>
        </div>
      </section>
      <ConfirmUserInfo email_address={emails.filter((mail) => mail.primary)[0].email} new_password={password} />
      <div className="buttons">
        <EduIDButton id="change-password-finished" buttonstyle="link" className="normal-case" type="submit">
          <FormattedMessage defaultMessage="Go to dashboard" description="Go to dashboard" />
        </EduIDButton>
      </div>
    </form>
  );
}

import { idUserEmail, idUserPassword } from "components/Signup/SignupUserCreated";
import { FormattedMessage } from "react-intl";

interface EmailProps {
  email?: string;
}

interface ConfirmUserInfoProps {
  email_address: string;
  new_password: string;
}

export const EmailFieldset = ({ email }: EmailProps): React.JSX.Element => {
  return (
    <fieldset>
      <label htmlFor={idUserEmail}>
        <FormattedMessage defaultMessage="Email address" description="Email label" />
      </label>
      <div className="display-data">
        <output id={idUserEmail}>{email}</output>
      </div>
    </fieldset>
  );
};

export function ConfirmUserInfo({ email_address, new_password }: Readonly<ConfirmUserInfoProps>) {
  return (
    <div id="email-display">
      <EmailFieldset email={email_address} />
      <fieldset>
        <label htmlFor={idUserPassword}>
          <FormattedMessage defaultMessage="Password" description="Password label" />
        </label>
        <div className="display-data">
          <mark className="force-select-all">
            <output id={idUserPassword}>{new_password}</output>
          </mark>
        </div>
        <input autoComplete="new-password" type="password" id="display-none-new-password" defaultValue={new_password} />
      </fieldset>
    </div>
  );
}

import { idUserEmail, idUserPassword } from "components/Signup/SignupUserCreated";
import { FormattedMessage } from "react-intl";

interface EmailProps {
  email?: string;
}

interface ConfirmUserInfoProps {
  readonly email_address: string;
  readonly new_password: string;
}

export const EmailFieldset = ({ email }: EmailProps): JSX.Element => {
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

export function ConfirmUserInfo(props: ConfirmUserInfoProps) {
  return (
    <div id="email-display">
      <EmailFieldset email={props.email_address} />
      <fieldset>
        <label htmlFor={idUserPassword}>
          <FormattedMessage defaultMessage="Password" description="Password label" />
        </label>
        <div className="display-data">
          <mark className="force-select-all">
            <output id={idUserPassword}>{props.new_password}</output>
          </mark>
        </div>
        <input
          autoComplete="new-password"
          type="password"
          name="display-none-new-password"
          id="display-none-new-password"
          defaultValue={props.new_password ? props.new_password : ""}
        />
      </fieldset>
    </div>
  );
}

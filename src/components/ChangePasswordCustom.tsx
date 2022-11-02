import { translate } from "login/translation";
import { useState } from "react";
import { Field as FinalField } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { ChangePasswordChildFormProps } from "./ChangePasswordForm";
import PasswordStrengthMeter, { PasswordStrengthData } from "./PasswordStrengthMeter";
import { WrappedPasswordInput } from "login/components/Inputs/PasswordInput";
import { useDashboardAppSelector } from "dashboard-hooks";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChangePasswordCustomFormProps extends ChangePasswordChildFormProps {}

export default function ChangePasswordCustomForm(props: ChangePasswordCustomFormProps) {
  const [passwordData, setPasswordData] = useState<PasswordStrengthData>({});
  const emails = useDashboardAppSelector((state) => state.emails.emails);

  let email: string | undefined;
  if (emails.length >= 1) {
    email = emails.filter((mail) => mail.primary)[0].email;
  } else {
    email = undefined;
  }

  function updatePasswordData(value: PasswordStrengthData) {
    // This function is called when the password strength meter has calculated password strength
    // on the current value in the form. We need to trigger validation of the field again at this
    // point, since validation uses this calculated value (and will already have executed when we
    // get here).
    setPasswordData(value);
    props.formProps.form.change("custom", props.formProps.values.custom);
  }

  // Form field validators
  const required = (value?: string) => (value ? undefined : "required");

  function strongEnough(value?: string): string | undefined {
    // check that the custom password is strong enough, using a score computed in the
    // PasswordStrengthMeter component.
    if (!value) {
      return "required";
    }
    if (passwordData.isTooWeak !== false) {
      return "chpass.low-password-entropy";
    }
  }

  function mustMatch(value?: string): string | undefined {
    // validate that the repeated password is the same as the first one (called 'custom')
    if (!value) {
      return "required";
    }
    if (value !== props.formProps.values.custom) {
      return "chpass.different-repeat";
    }
  }

  return (
    <form id="passwordsview-form" className="security-zone-form" role="form" onSubmit={props.formProps.handleSubmit}>
      <div className="password-format">
        <span>
          <FormattedMessage defaultMessage="Tip: Choose a strong password" description="Password format tips" />
        </span>
        <ul id="password-custom-help">
          {[
            <FormattedMessage
              defaultMessage={`Use upper- and lowercase characters, but not at the beginning or end`}
              description="help text for custom password tips"
            />,
            <FormattedMessage
              defaultMessage={`Add digits somewhere, but not at the beginning or end`}
              description="help text for custom password tips"
            />,
            <FormattedMessage
              defaultMessage={`Add special characters, such as  @ $ \ + _ %`}
              description="help text for custom password tips"
            />,
            <FormattedMessage defaultMessage={`Spaces are ignored`} description="help text for custom password tips" />,
          ].map((list, index) => {
            return (
              <li key={index} className="help-text">
                {list}
              </li>
            );
          })}
        </ul>
      </div>

      <fieldset>
        <input hidden readOnly autoComplete="username" name="username" type="text" defaultValue={email} />
        <FinalField
          name="custom"
          component={WrappedPasswordInput}
          componentClass="input"
          type="password"
          label={translate("chpass.form_custom_password")}
          id="custom-password-field"
          validate={required}
          autoComplete="new-password"
        />
        <div className="form-field-error-area" key="1">
          {props.formProps.values.custom && (
            <PasswordStrengthMeter password={props.formProps.values.custom} passStateUp={updatePasswordData} />
          )}
        </div>
        <FinalField
          autoComplete="new-password"
          name="repeat"
          component={WrappedPasswordInput}
          componentClass="input"
          type="password"
          id="repeat-password-field"
          label={translate("chpass.form_custom_password_repeat")}
          validate={mustMatch}
        />
      </fieldset>
    </form>
  );
}

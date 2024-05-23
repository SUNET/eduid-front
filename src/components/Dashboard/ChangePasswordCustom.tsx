import EduIDButton from "components/Common/EduIDButton";
import NewPasswordInput from "components/Common/NewPasswordInput";
import PasswordStrengthMeter, { PasswordStrengthData } from "components/Common/PasswordStrengthMeter";
import { useState } from "react";
import { Field as FinalField } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { ChangePasswordChildFormProps } from "./ChangePassword";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChangePasswordCustomFormProps extends ChangePasswordChildFormProps {}

export default function ChangePasswordCustomForm(props: ChangePasswordCustomFormProps) {
  const [passwordData, setPasswordData] = useState<PasswordStrengthData>({});
  const intl = useIntl();

  const new_password_placeholder = intl.formatMessage({
    id: "placeholder.new_password_placeholder",
    defaultMessage: "enter new password",
    description: "placeholder text for new password",
  });

  const repeat_new_password_placeholder = intl.formatMessage({
    id: "placeholder.repeat_new_password_placeholder",
    defaultMessage: "repeat new password",
    description: "placeholder text for repeat new password",
  });

  function updatePasswordData(value: PasswordStrengthData) {
    // This function is called when the password strength meter has calculated password strength
    // on the current value in the form. We need to trigger validation of the field again at this
    // point, since validation uses this calculated value (and will already have executed when we
    // get here).
    setPasswordData(value);
    props.formProps.form.change("custom", props.formProps.values.custom);
  }

  function strongEnough(value?: string): string | undefined {
    // check that the custom password is strong enough, using a score computed in the
    // PasswordStrengthMeter component.
    if (!value) {
      return "required";
    } else if (passwordData.isTooWeak && passwordData.score !== 4) {
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
    <form id="passwords-view-form" onSubmit={props.formProps.handleSubmit}>
      <fieldset className="password-format">
        <label>
          <FormattedMessage
            defaultMessage="Tip: Choose a strong password"
            description="help text for custom password label"
          />
        </label>
        <ul id="password-custom-help">
          {[
            <FormattedMessage
              key={1}
              defaultMessage={`Use upper- and lowercase characters, but not at the beginning or end`}
              description="help text for custom password tips"
            />,
            <FormattedMessage
              key={2}
              defaultMessage={`Add digits somewhere, but not at the beginning or end`}
              description="help text for custom password tips"
            />,
            <FormattedMessage
              key={3}
              defaultMessage={`Add special characters, such as  @ $ \\ + _ %`}
              description="help text for custom password tips"
            />,
            <FormattedMessage
              key={4}
              defaultMessage={`Spaces are ignored`}
              description="help text for custom password tips"
            />,
          ].map((list) => {
            return <li key={list.key}>{list}</li>;
          })}
        </ul>
      </fieldset>

      <fieldset className="change-password-custom-inputs">
        <FinalField
          name="custom"
          component={NewPasswordInput}
          componentClass="input"
          type="password"
          label={
            <FormattedMessage defaultMessage="Enter new password" description="chpass form custom password label" />
          }
          passwordStrengthMeter={
            <PasswordStrengthMeter password={props.formProps.values.custom} passStateUp={updatePasswordData} />
          }
          id="custom-password-field"
          validate={strongEnough}
          autoComplete="new-password"
          required={true}
          placeHolder={new_password_placeholder}
        />
        <FinalField
          name="repeat"
          component={NewPasswordInput}
          componentClass="input"
          type="password"
          id="repeat-password-field"
          label={
            <FormattedMessage defaultMessage="Repeat new password" description="chpass form custom password repeat" />
          }
          validate={mustMatch}
          required={true}
          placeHolder={repeat_new_password_placeholder}
        />
      </fieldset>
      <div id="chpass-form" className="tab-pane buttons">
        <EduIDButton buttonstyle="secondary" onClick={props.handleCancel}>
          <FormattedMessage defaultMessage="cancel" description="button cancel" />
        </EduIDButton>
        <EduIDButton
          type="submit"
          id="chpass-button"
          buttonstyle="primary"
          disabled={props.formProps.submitting || props.formProps.invalid}
          onClick={props.formProps.handleSubmit}
        >
          <FormattedMessage defaultMessage="Save" description="button save" />
        </EduIDButton>
      </div>
    </form>
  );
}

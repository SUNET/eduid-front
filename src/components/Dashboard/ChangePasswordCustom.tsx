import CustomInput from "components/Common/CustomInput";
import EduIDButton from "components/Common/EduIDButton";
import PasswordStrengthMeter, { PasswordStrengthData } from "components/Common/PasswordStrengthMeter";
import { useState } from "react";
import { Field as FinalField } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { ChangePasswordChildFormProps } from "./ChangePassword";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChangePasswordCustomFormProps extends ChangePasswordChildFormProps {}

export default function ChangePasswordCustomForm(props: ChangePasswordCustomFormProps) {
  const [passwordData, setPasswordData] = useState<PasswordStrengthData>({});

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
    <form id="passwordsview-form" onSubmit={props.formProps.handleSubmit}>
      <div className="password-format">
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
      </div>

      <fieldset>
        <div>
          <FinalField
            name="custom"
            component={CustomInput}
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
          />
          <FinalField
            name="repeat"
            component={CustomInput}
            componentClass="input"
            type="password"
            id="repeat-password-field"
            label={
              <FormattedMessage defaultMessage="Repeat new password" description="chpass form custom password repeat" />
            }
            validate={mustMatch}
          />
        </div>
      </fieldset>
      <div id="chpass-form" className="tabpane buttons">
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

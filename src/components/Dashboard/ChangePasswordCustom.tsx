import EduIDButton from "components/Common/EduIDButton";
import NewPasswordInput from "components/Common/NewPasswordInput";
import PasswordStrengthMeter from "components/Common/PasswordStrengthMeter";
import { emptyStringPattern } from "helperFunctions/validation/regexPatterns";
import { useState } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { ChangePasswordChildFormProps, ChangePasswordFormData } from "./ChangePassword";

interface ChangePasswordCustomFormProps extends ChangePasswordChildFormProps {
  readonly handleSubmit: (values: ChangePasswordFormData) => Promise<void>;
}

function validateNewPassword(values: { custom?: string; repeat?: string }) {
  const errors: { custom?: string; repeat?: string } = {};
  if (values !== undefined) {
    (["custom", "repeat"] as Array<keyof typeof values>).forEach((inputName) => {
      if (!values[inputName] || emptyStringPattern.test(values[inputName])) {
        errors[inputName] = "required";
      } else if (values["custom"]?.replaceAll(/\s/g, "") !== values["repeat"]?.replaceAll(/\s/g, "")) {
        // Remove whitespace from both passwords before comparing
        errors["repeat"] = "chpass.different-repeat";
      }
    });
  }

  return errors;
}

export default function ChangePasswordCustomForm(props: ChangePasswordCustomFormProps) {
  const intl = useIntl();
  const [pwScore, setPwScore] = useState(0);

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

  function updatePasswordData(data: { score?: number }) {
    // This function is called when the password strength meter has calculated password strength
    // on the current value in the form. We need to trigger validation of the field again at this
    // point, since validation uses this calculated value (and will already have executed when we
    // get here).
    setPwScore(data.score ?? 0);
    props.formProps.form.change("custom", props.formProps.values?.custom);
  }

  return (
    <FinalForm<ChangePasswordFormData>
      onSubmit={props.handleSubmit}
      validate={validateNewPassword}
      render={(formProps) => {
        return (
          <form id="passwords-view-form" onSubmit={formProps.handleSubmit}>
            <fieldset>
              <legend>
                <strong>
                  <FormattedMessage
                    defaultMessage="Tip: Choose a strong password"
                    description="help text for custom password label"
                  />
                </strong>
              </legend>
              <ul className="password-custom-help">
                {[
                  <FormattedMessage
                    key={1}
                    defaultMessage="Use upper- and lowercase characters, but not at the beginning or end"
                    description="help text for custom password tips"
                  />,
                  <FormattedMessage
                    key={2}
                    defaultMessage="Add digits somewhere, but not at the beginning or end"
                    description="help text for custom password tips"
                  />,
                  <FormattedMessage
                    key={3}
                    defaultMessage="Add special characters, such as  @ $ \\ + _ %"
                    description="help text for custom password tips"
                  />,
                  <FormattedMessage
                    key={4}
                    defaultMessage="Spaces are ignored"
                    description="help text for custom password tips"
                  />,
                ].map((list) => {
                  return <li key={list.key}>{list}</li>;
                })}
              </ul>

              <FinalField
                name="custom"
                component={NewPasswordInput}
                componentClass="input"
                type="password"
                label={
                  <FormattedMessage
                    defaultMessage="Enter new password"
                    description="chpass form custom password label"
                  />
                }
                passwordStrengthMeter={
                  <PasswordStrengthMeter password={formProps.values?.custom} passStateUp={updatePasswordData} />
                }
                autoComplete="new-password"
                required={true}
                placeHolder={new_password_placeholder}
                autoFocus={true}
              />
              <FinalField
                name="repeat"
                component={NewPasswordInput}
                componentClass="input"
                type="password"
                label={
                  <FormattedMessage
                    defaultMessage="Repeat new password"
                    description="chpass form custom password repeat"
                  />
                }
                required={true}
                placeHolder={repeat_new_password_placeholder}
              />
            </fieldset>
            <div id="chpass-form" className="buttons">
              <EduIDButton buttonstyle="secondary" onClick={props.handleCancel}>
                <FormattedMessage defaultMessage="cancel" description="button cancel" />
              </EduIDButton>
              <EduIDButton
                type="submit"
                id="chpass-button"
                buttonstyle="primary"
                // prevent weak password submission by disabling save button if score is too low
                disabled={formProps.submitting || formProps.invalid || Boolean(pwScore <= 2)}
                onClick={formProps.handleSubmit}
              >
                <FormattedMessage defaultMessage="Save" description="button save" />
              </EduIDButton>
            </div>
          </form>
        );
      }}
    />
  );
}

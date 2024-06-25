import { changePassword } from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import NewPasswordInput from "components/Common/NewPasswordInput";
import PasswordStrengthMeter from "components/Common/PasswordStrengthMeter";
import { useAppDispatch } from "eduid-hooks";
import { emptyStringPattern } from "helperFunctions/validation/regexPatterns";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { ChangePasswordChildFormProps, ChangePasswordFormData } from "./ChangePassword";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChangePasswordCustomFormProps extends ChangePasswordChildFormProps {}

export default function ChangePasswordCustomForm(props: ChangePasswordCustomFormProps) {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  function updatePasswordData() {
    // This function is called when the password strength meter has calculated password strength
    // on the current value in the form. We need to trigger validation of the field again at this
    // point, since validation uses this calculated value (and will already have executed when we
    // get here).
    props.formProps.form.change("custom", props.formProps.values.custom);
  }

  function validateNewPassword(values: { custom?: string; repeat?: string }) {
    const errors: { custom?: string; repeat?: string } = {};
    if (values !== undefined) {
      (["custom", "repeat"] as Array<keyof typeof values>).forEach((inputName) => {
        if (!values[inputName] || emptyStringPattern.test(values[inputName] as string)) {
          errors[inputName] = "required";
        } else if (values["custom"]?.replace(/\s/g, "") !== values["repeat"]?.replace(/\s/g, "")) {
          // Remove whitespace from both passwords before comparing
          errors["repeat"] = "chpass.different-repeat";
        }
      });
    }

    return errors;
  }

  async function handleSubmitPasswords(values: ChangePasswordFormData) {
    if (values.custom) {
      const response = await dispatch(changePassword({ new_password: values.custom }));
      if (changePassword.fulfilled.match(response)) {
        navigate("/profile/chpass/success", {
          state: values.custom,
        });
      }
    }
  }

  return (
    <FinalForm<any>
      onSubmit={handleSubmitPasswords}
      validate={validateNewPassword}
      render={(formProps) => {
        return (
          <form id="passwords-view-form" onSubmit={formProps.handleSubmit}>
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
                  <FormattedMessage
                    defaultMessage="Enter new password"
                    description="chpass form custom password label"
                  />
                }
                passwordStrengthMeter={
                  <PasswordStrengthMeter password={formProps.values.custom} passStateUp={updatePasswordData} />
                }
                id="custom-password-field"
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
                  <FormattedMessage
                    defaultMessage="Repeat new password"
                    description="chpass form custom password repeat"
                  />
                }
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
                disabled={formProps.submitting || formProps.invalid}
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

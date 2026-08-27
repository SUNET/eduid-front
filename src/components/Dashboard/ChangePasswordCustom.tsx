import EduIDButton from "components/Common/EduIDButton";
import NewPasswordInput from "components/Common/NewPasswordInput";
import PasswordStrengthMeter from "components/Common/PasswordStrengthMeter";
import { emptyStringPattern } from "helperFunctions/validation/regexPatterns";
import { useCallback, useState } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { ChangePasswordChildFormProps, ChangePasswordFormData } from "./ChangePassword";

interface ChangePasswordCustomFormProps extends ChangePasswordChildFormProps {
  handleSubmit: (values: ChangePasswordFormData) => Promise<void>;
}

function validateNewPassword(values: { custom?: string; repeat?: string }) {
  const errors: { custom?: string; repeat?: string } = {};
  const { custom, repeat } = values;

  if (!values) return errors;
  if (!custom || emptyStringPattern.test(custom)) {
    errors.custom = "required";
  }
  if (!repeat || emptyStringPattern.test(repeat)) {
    errors.repeat = "required";
  }
  if (custom && repeat) {
    const normalizedCustom = custom.replaceAll(/\s/g, "");
    const normalizedRepeat = repeat.replaceAll(/\s/g, "");
    if (normalizedCustom !== normalizedRepeat) {
      errors.repeat = "chpass.different-repeat";
    }
  }

  return errors;
}

export default function ChangePasswordCustomForm(props: Readonly<ChangePasswordCustomFormProps>) {
  const intl = useIntl();
  const [pwScore, setPwScore] = useState(0);

  const new_password_placeholder = intl.formatMessage({
    id: "passwordCustom.placeholder",
    defaultMessage: "enter new password",
    description: "placeholder text for new password",
  });

  const repeat_new_password_placeholder = intl.formatMessage({
    id: "passwordCustom.repeatPlaceholder",
    defaultMessage: "repeat new password",
    description: "placeholder text for repeat new password",
  });

  const updatePasswordData = useCallback(
    (data: { score?: number }) => {
      setPwScore(data.score ?? 0);
      props.formProps.form.change("custom", props.formProps.values?.custom);
    },
    [props.formProps.form, props.formProps.values?.custom],
  );

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
                    id="passwordCustom.label"
                    defaultMessage="Tip: Choose a strong password"
                    description="help text for custom password label"
                  />
                </strong>
              </legend>
              <ul className="password-custom-help">
                {[
                  <FormattedMessage
                    id="passwordCustom.tipCase"
                    key={1}
                    defaultMessage="Use upper- and lowercase characters, but not at the beginning or end"
                    description="help text for custom password tips"
                  />,
                  <FormattedMessage
                    id="passwordCustom.tipDigits"
                    key={2}
                    defaultMessage="Add digits somewhere, but not at the beginning or end"
                    description="help text for custom password tips"
                  />,
                  <FormattedMessage
                    id="passwordCustom.tipSpecial"
                    key={3}
                    defaultMessage="Add special characters, such as  @ $ \\ + _ %"
                    description="help text for custom password tips"
                  />,
                  <FormattedMessage
                    id="passwordCustom.tipSpaces"
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
                    id="passwordCustom.chpassLabel"
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
                    id="common.repeatNewPassword"
                    defaultMessage="Repeat new password"
                    description="chpass form custom password repeat"
                  />
                }
                required={true}
                placeHolder={repeat_new_password_placeholder}
              />
            </fieldset>
            <span className="suggestion-txt">
              <FormattedMessage
                id="passwordCustom.remember"
                defaultMessage="Memorise or keep your password safe!"
                description="remember pw prompt"
              />
            </span>
            <div id="chpass-form" className="buttons">
              <EduIDButton buttonstyle="secondary" onClick={props.handleCancel}>
                <FormattedMessage id="common.cancel" defaultMessage="cancel" description="button cancel" />
              </EduIDButton>
              <EduIDButton
                type="submit"
                id="chpass-button"
                buttonstyle="primary"
                // prevent weak password submission by disabling save button if score is too low
                disabled={formProps.submitting || formProps.invalid || pwScore <= 2}
                onClick={formProps.handleSubmit}
              >
                <FormattedMessage id="common.save" defaultMessage="Save" description="button save" />
              </EduIDButton>
            </div>
          </form>
        );
      }}
    />
  );
}

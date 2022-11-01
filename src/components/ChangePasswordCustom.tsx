import TextInput from "components/EduIDTextInput";
import { translate } from "login/translation";
import React, { useState } from "react";
import { Field as FinalField } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { FormText } from "reactstrap";
import { ChangePasswordChildFormProps } from "./ChangePasswordForm";
import PasswordStrengthMeter, { PasswordStrengthData } from "./PasswordStrengthMeter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import CustomInput from "login/components/Inputs/CustomInput";
import PasswordInput, { WrappedPasswordInput } from "login/components/Inputs/PasswordInput";

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
        <FontAwesomeIcon icon={faExclamationCircle as IconProp} />
        <FormattedMessage defaultMessage="Tip: Choose a strong password" description="Password format tips" />
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
            return <li key={index}>{list}</li>;
          })}
        </ul>
      </div>

      <fieldset>
        <FinalField
          name="custom"
          component={WrappedPasswordInput}
          componentClass="input"
          type="password"
          label={translate("chpass.form_custom_password")}
          id="custom-password-field"
          validate={strongEnough}
          autocomplete="new-password"
        />
        <PasswordStrengthMeter password={props.formProps.values.custom} passStateUp={updatePasswordData} />
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

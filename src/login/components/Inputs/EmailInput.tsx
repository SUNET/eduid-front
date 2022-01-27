import { translate } from "login/translation";
import React from "react";
import { useIntl } from "react-intl";
import { Field } from "redux-form";
import CustomInput from "./CustomInput";

interface EmailInputProps {
  required: boolean;
  autoFocus: boolean;
}

const EmailInput = ({ required, autoFocus }: EmailInputProps): JSX.Element => {
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.email",
    defaultMessage: "name@example.com",
    description: "placeholder text for email input",
  });
  return (
    <Field
      required={required}
      label={translate("profile.email_display_title")}
      component={CustomInput}
      componentClass="input"
      type="email"
      name="email"
      autoFocus={autoFocus}
      ariaLabel={"enter your email address to login"}
      autoComplete="username"
      placeholder={placeholder}
    />
  );
};

export default EmailInput;

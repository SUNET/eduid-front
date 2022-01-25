import { validateEmailField } from "login/app_utils/validation/validateEmail";
import { translate } from "login/translation";
import React from "react";
import { Field as FinalField } from "react-final-form";
import { useIntl } from "react-intl";
import CustomInput from "./CustomInput";

interface EmailInputProps {
  required: boolean;
  autoFocus: boolean;
  name?: string;
}

export default function EmailInput(props: EmailInputProps): JSX.Element {
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.email",
    defaultMessage: "name@example.com",
    description: "placeholder text for email input",
  });

  return (
    <FinalField
      required={props.required}
      label={translate("profile.email_display_title")}
      component={CustomInput}
      componentClass="input"
      type="email"
      name={props.name || "email"}
      autoFocus={props.autoFocus}
      ariaLabel={"enter your email address to login"}
      autoComplete="username"
      placeholder={placeholder}
      validate={validateEmailField}
    />
  );
}

import React from "react";
import { Field as FinalField } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import CustomInput from "./CustomInput";

export default function PasswordInput(props: { name?: string }): JSX.Element {
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.password",
    defaultMessage: "enter password",
    description: "placeholder text for password input",
  });

  const required = (value: string) => (value ? undefined : "required");

  return (
    <FinalField
      type="password"
      name={props.name || "current-password"}
      component={CustomInput}
      // autoComplete="current-password"
      required={true}
      label={<FormattedMessage defaultMessage="Password" description="password input field label" />}
      placeholder={placeholder}
      helpBlock={""}
      validate={required}
    />
  );
}

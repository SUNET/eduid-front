import { InputWrapper } from "login/components/Inputs/InputWrapper";
import React, { useState } from "react";
import { Field as FinalField, FieldRenderProps } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { Input, InputProps } from "reactstrap";

interface PasswordInputProps {
  name: string;
  autoComplete?: "current-password" | "new-password";
  helpBlock?: React.ReactNode; // help text shown above input
}

export default function PasswordInput(props: PasswordInputProps): JSX.Element {
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.password",
    defaultMessage: "enter password",
    description: "placeholder text for password input",
  });

  return (
    <FinalField
      type="password"
      name={props.name}
      component={WrappedPasswordInput}
      autoComplete={props.autoComplete}
      required={true}
      placeholder={placeholder}
      // parameters for InputWrapper
      helpBlock={props.helpBlock}
      label={<FormattedMessage defaultMessage="Password" description="password input field label" />}
    />
  );
}

export function WrappedPasswordInput(props: FieldRenderProps<string>): JSX.Element {
  const { input, meta } = props;

  // the InputWrapper renders it's children plus a label, helpBlock and any error message from the field validation
  return (
    <InputWrapper {...props}>
      <PasswordInputElement {...props} />
    </InputWrapper>
  );
}

/**
 * Render a Password input component and a Show/Hide button to toggle between text-input and password-input.
 * @param props
 * @returns
 */
function PasswordInputElement(props: InputProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <React.Fragment>
      <Input
        {...props.input}
        id={props.input.name}
        type={showPassword ? "text" : "password"}
        valid={props.meta.valid}
        invalid={props.meta.invalid}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
      />

      <button
        type="button"
        aria-label={showPassword ? "hide password" : "show password"}
        className="show-hide-button"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <FormattedMessage defaultMessage="HIDE" description="nin/password button label" />
        ) : (
          <FormattedMessage defaultMessage="SHOW" description="nin/password button label" />
        )}
      </button>
    </React.Fragmen>
  );
}

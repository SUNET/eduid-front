import { FieldState } from "final-form";
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

  function required(value: string, allValues: object, meta?: FieldState<string>) {
    if (!value && props.autoComplete && !meta?.touched) {
      /* Browsers handle auto-completed fields differently. Current Chrome for example seems to often (but not always)
       * fill in the value on-screen, but not tell Javascript about it so the validator doesn't see that a value has
       * been entered, and might show "required", which will confuse the user. As soon as the user clicks anywhere on
       * the page (including on a seemingly disabled submit-button), the validator will run and the error will be
       * cleared.
       *
       * We want to suppress this exact validation error before the user clicks anywhere.
       */
      return null;
    }

    if (!value) return "required";
  }

  return (
    <FinalField
      type="password"
      name={props.name}
      component={WrappedPasswordInput}
      autoComplete={props.autoComplete}
      required={true}
      placeholder={placeholder}
      validate={required}
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
      <PasswordInputElement {...props} name={input.name} id={input.name} valid={meta.valid} invalid={meta.invalid} />
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
    <div className="password-input">
      <Input {...props.input} type={showPassword ? "text" : "password"} />

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
    </div>
  );
}

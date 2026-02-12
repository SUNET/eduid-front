import { useAppSelector } from "eduid-hooks";
import React, { useEffect, useRef, useState } from "react";
import { Field as FinalField } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { CustomInputProps } from "./CustomInput";
import { InputWrapper } from "./InputWrapper";
import { ShowAndHideButton } from "./ShowAndHideButton";

interface PasswordInputProps {
  name: string;
  autoComplete?: "current-password" | "new-password";
  helpBlock?: React.ReactNode; // help text shown above input
}

export default function PasswordInput(props: PasswordInputProps): React.JSX.Element {
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

export function WrappedPasswordInput(props: Readonly<CustomInputProps<string>>): React.JSX.Element {
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
export function PasswordInputElement(props: Readonly<CustomInputProps<string>>): React.JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const forced_username = useAppSelector((state) => state.login.authn_options.forced_username);

  useEffect(() => {
    if (inputRef.current && forced_username) inputRef?.current?.focus();
  }, [forced_username]);

  let className = "is-valid";
  if (props.meta.touched || props.meta.submitFailed) {
    if (props.meta.invalid) {
      className = "is-invalid";
    }
  }
  if (props.disabled) {
    className = "disabled";
  }

  return (
    <div className="password-input">
      <ShowAndHideButton isShown={showPassword} onClick={() => setShowPassword(!showPassword)} />
      <input
        {...props.input}
        id={props.input.name}
        type={showPassword ? "text" : "password"}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
        className={className}
        ref={inputRef}
      />
    </div>
  );
}

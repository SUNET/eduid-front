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

export function PasswordInput({ name, autoComplete, helpBlock }: Readonly<PasswordInputProps>) {
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
      name={name}
      component={WrappedPasswordInput}
      autoComplete={autoComplete}
      required={true}
      placeholder={placeholder}
      // parameters for InputWrapper
      helpBlock={helpBlock}
      label={<FormattedMessage defaultMessage="Password" description="password input field label" />}
    />
  );
}

export function WrappedPasswordInput(props: Readonly<CustomInputProps<string>>) {
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
export function PasswordInputElement({
  meta,
  disabled,
  input,
  placeholder,
  autoComplete,
  autoFocus,
}: Readonly<CustomInputProps<string>>) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const forced_username = useAppSelector((state) => state.login.authn_options.forced_username);

  useEffect(() => {
    if (inputRef.current && forced_username) inputRef?.current?.focus();
  }, [forced_username]);

  let className = "is-valid";
  if (meta.touched || meta.submitFailed) {
    if (meta.invalid) {
      className = "is-invalid";
    }
  }
  if (disabled) {
    className = "disabled";
  }

  return (
    <div className="password-input">
      <ShowAndHideButton isShown={showPassword} onClick={() => setShowPassword(!showPassword)} />
      <input
        {...input}
        id={input.name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={className}
        ref={inputRef}
      />
    </div>
  );
}

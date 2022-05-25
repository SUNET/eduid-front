import React, { Fragment, useState } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { Input, InputProps } from "reactstrap";
import InputWrapper from "./InputWrapper";

interface CustomInputProps extends FieldRenderProps<string> {
  label?: string;
  helpBlock?: React.ReactNode;
  disabled?: boolean;
  autocomplete?: string;
}

export default function CustomInput(props: FieldRenderProps<string>): JSX.Element {
  const { meta, input } = props;

  return (
    <InputWrapper {...props}>
      {input.name === "current-password" ? (
        <PasswordInputElement {...props} name={input.name} id={input.name} valid={meta.valid} invalid={meta.invalid} />
      ) : (
        <InputElement {...props} valid={meta.valid} invalid={meta.invalid} />
      )}
    </InputWrapper>
  );
}

const InputElement = (props: CustomInputProps): JSX.Element => {
  const { input, selectOptions, valid } = props;
  if (selectOptions) {
    const renderSelect = selectOptions.map((option: string[], index: number) => {
      return (
        <Fragment key={index}>
          <label key={option[0]} htmlFor={option[1]}>
            <input
              className={props.meta.error && props.meta.visited ? "radio-input error" : "radio-input"}
              key={option[0]}
              id={option[1]}
              type="radio"
              {...input}
              value={option[0]}
              checked={option[0] === input.value}
            />
            <span key={index}>{option[1]}</span>
          </label>
        </Fragment>
      );
    });

    return <div className="radio-input-container">{renderSelect}</div>;
  }
  return (
    <Input
      id={input.name}
      type={props.type}
      placeholder={props.placeholder}
      valid={input.value !== "" && valid}
      aria-required={input.required}
      invalid={props.invalid}
      {...input}
      autoFocus={props.autoFocus}
    />
  );
};

/**
 * Render a Password input component, with a checkmark if something has been entered and a Show/Hide button
 * to toggle between text-input and password-input.
 * @param props
 * @returns
 */
function PasswordInputElement(props: InputProps): JSX.Element {
  const { input } = props;
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="password-input">
      <Input
        {...input}
        type={showPassword ? "text" : "password"}
        placeholder={props.placeholder}
        valid={props.valid}
        invalid={props.invalid}
        autoComplete={props.autoComplete}
        aria-label={props.ariaLabel}
        aria-required={props.required}
        id={props.id}
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
    </div>
  );
}

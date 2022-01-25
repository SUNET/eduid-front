import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translate } from "login/translation";
import React, { useState } from "react";
import { Field as FinalField } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { Input, InputProps } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";
import CustomInput from "./CustomInput";

function RenderHideButton(props: { setInputType: (value: InputType) => void }) {
  return (
    <button
      type="button"
      aria-label="hide password"
      className="show-hide-button"
      onClick={() => props.setInputType("password")}
    >
      <div className="button-text-container">{translate("nin_hide_last_four_digits")}</div>
    </button>
  );
}

function RenderShowButton(props: { setInputType: (value: InputType) => void }) {
  return (
    <button
      type="button"
      aria-label="show password"
      className="show-hide-button"
      onClick={() => props.setInputType("text")}
    >
      {translate("nin_show_last_four_digits")}
    </button>
  );
}

export function PasswordInputElement(props: InputProps): JSX.Element {
  const { input } = props;
  const [inputType, setInputType] = useState(props.input.type);
  return (
    <div className="password-input">
      <Input
        {...input}
        type={inputType}
        placeholder={props.placeholder}
        valid={props.valid}
        invalid={props.invalid}
        autoComplete={props.autoComplete}
        aria-label={props.ariaLabel}
        aria-required={props.required}
        id={props.id}
      />
      {props.valid ? (
        <div className="checkmark">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      ) : null}
      {inputType === "password" ? (
        <RenderShowButton {...props} setInputType={setInputType} />
      ) : inputType === "text" ? (
        <RenderHideButton {...props} setInputType={setInputType} />
      ) : null}
    </div>
  );
}

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
      autoComplete="current-password"
      required={true}
      label={<FormattedMessage defaultMessage="Password" description="password input field label" />}
      placeholder={placeholder}
      helpBlock={""}
      validate={required}
    />
  );
}

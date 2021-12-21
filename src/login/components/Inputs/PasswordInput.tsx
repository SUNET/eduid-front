import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translate } from "login/translation";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import Input from "reactstrap/lib/Input";
import { Field } from "redux-form";
import CustomInput from "./CustomInput";

function RenderHideButton(props: { setInputType: (value: string) => void }) {
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

function RenderShowButton(props: { setInputType: (value: string) => void }) {
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

interface PasswordInputElementProps {
  input: any;
  type: any;
  placeholder: string;
  valid: boolean;
  invalid: boolean;
  autoComplete: any;
  ariaLabel: any;
  required: boolean;
  id: string;
}
export function PasswordInputElement(props: PasswordInputElementProps): JSX.Element {
  const { input } = props;
  const [inputType, setInputType] = useState(props.type);
  return (
    <div className="password-input">
      <Input
        type={inputType}
        placeholder={props.placeholder}
        valid={props.valid}
        invalid={props.invalid}
        autoComplete={props.autoComplete}
        aria-label={props.ariaLabel}
        aria-required={props.required}
        id={props.id}
        {...input}
      />
      {props.valid ? (
        <div className="checkmark ">
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

export function PasswordInput(): JSX.Element {
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.password",
    defaultMessage: "enter password",
    description: "placeholder text for password input",
  });

  return (
    <Field
      type="password"
      name="current-password"
      component={CustomInput}
      autoComplete="current-password"
      required={true}
      label={translate("login.usernamePw.password-input")}
      placeholder={placeholder}
      helpBlock={""}
    />
  );
}

export default PasswordInput;

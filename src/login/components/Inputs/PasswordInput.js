import React, { useState } from "react";
import { Field } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import CustomInput from "./CustomInput";
import Input from "reactstrap/lib/Input";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";

let RenderHideButton = ({ setInputType, translate }) => (
  <button
    type="button"
    aria-label="hide password"
    className="show-hide-button"
    onClick={() => setInputType("password")}
  >
    <div className="button-text-container">{translate("nin_hide_last_four_digits")}</div>
  </button>
);

let RenderShowButton = ({ setInputType, translate }) => (
  <button type="button" aria-label="show password" className="show-hide-button" onClick={() => setInputType("text")}>
    {translate("nin_show_last_four_digits")}
  </button>
);

export let PasswordInputElement = (props) => {
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
};

let PasswordInput = ({ translate }) => {
  return (
    <Field
      type="password"
      name="current-password"
      component={CustomInput}
      autoComplete="current-password"
      required="true"
      label={translate("login.usernamePw.password-input")}
      placeholder={translate("placeholder.password")}
      helpBlock={""}
    />
  );
};

PasswordInput.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default InjectIntl(PasswordInput);

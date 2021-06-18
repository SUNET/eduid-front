import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Input from "reactstrap/lib/Input";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

let RenderHidePasswordIcon = ({ setInputType }) => (
  <button
    aria-label="hide password"
    className="icon"
    onClick={() => setInputType("password")}
  >
    <FontAwesomeIcon className="eye-hide-icon" icon={faEyeSlash} />
  </button>
);

let RenderShowPasswordIcon = ({ setInputType }) => (
  <button
    aria-label="show password"
    className="icon"
    onClick={() => setInputType("text")}
  >
    <FontAwesomeIcon className="eye-show-icon" icon={faEye} />
  </button>
);

let InputWithIcons = (props) => {
  const {
    input,
    name,
    disabled,
    placeholder,
    valid,
    invalid,
    autoComplete,
    autoFocus,
    ariaLabel,
    required,
  } = props;
  const [inputType, setInputType] = useState("password");
  return (
    <div className="password-input">
      <Input
        type={inputType}
        disabled={disabled}
        placeholder={placeholder}
        id={name}
        name={name}
        valid={valid}
        invalid={invalid}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
        aria-required={required}
        required={required}
        {...input}
      />
      {inputType === "password" ? (
        <RenderShowPasswordIcon setInputType={setInputType} />
      ) : inputType === "text" ? (
        <RenderHidePasswordIcon setInputType={setInputType} />
      ) : null}
    </div>
  );
};

export default InjectIntl(InputWithIcons);

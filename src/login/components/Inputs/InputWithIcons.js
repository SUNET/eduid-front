import React, { useState } from "react";
import Input from "reactstrap/lib/Input";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

let RenderHidePasswordIcon = ({ setInputType, translate }) => (
  <button
    aria-label="hide password"
    className="icon"
    onClick={() => setInputType("password")}
  >
    <div className="button-text-container">
      {translate("nin_hide_last_four_digits")}
    </div>
  </button>
);

let RenderShowPasswordIcon = ({ setInputType, translate }) => (
  <button
    aria-label="show password"
    className="icon"
    onClick={() => setInputType("text")}
  >
    {translate("nin_show_last_four_digits")}
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
        <RenderShowPasswordIcon {...props} setInputType={setInputType} />
      ) : inputType === "text" ? (
        <RenderHidePasswordIcon {...props} setInputType={setInputType} />
      ) : null}
    </div>
  );
};

export default InjectIntl(InputWithIcons);

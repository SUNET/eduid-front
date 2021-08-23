import React, { useState } from "react";
import Input from "reactstrap/lib/Input";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

let RenderHideButton = ({ setInputType, translate }) => (
  <button
    aria-label="hide password"
    className="show-hide-button"
    onClick={() => setInputType("password")}
  >
    <div className="button-text-container">
      {translate("nin_hide_last_four_digits")}
    </div>
  </button>
);

let RenderShowButton = ({ setInputType, translate }) => (
  <button
    aria-label="show password"
    className="show-hide-button"
    onClick={() => setInputType("text")}
  >
    {translate("nin_show_last_four_digits")}
  </button>
);

let InputToggleShowHide = (props) => {
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
    required
  } = props;
  const [inputType, setInputType] = useState("password");
  const suggested_password = useSelector(
    (state) => state.resetPassword.suggested_password
  );

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
        //To dispaly suggested password in input
        value={name === "new-password" && suggested_password !== undefined && suggested_password}
        //Not editable password input
        readOnly={name ==="new-password" && true}
      />
      {inputType === "password" ? (
        <RenderShowButton {...props} setInputType={setInputType} />
      ) : inputType === "text" ? (
        <RenderHideButton {...props} setInputType={setInputType} />
      ) : null}
    </div>
  );
};

InputToggleShowHide.propTypes = {
  input: PropTypes.object,
  name: PropTypes.string.isRequired,
  disable: PropTypes.bool,
  placeholder: PropTypes.string,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  ariaLabel: PropTypes.string,
  required: PropTypes.bool,
};

export default InjectIntl(InputToggleShowHide);

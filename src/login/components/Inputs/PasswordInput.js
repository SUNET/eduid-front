import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import CustomInput from "./CustomInput";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

let PasswordInput = ({ required, translate }) => {
  return (
    <Field
      type="password"
      name="current-password"
      component={CustomInput}
      autoComplete="current-password"
      required={required}
      label={translate("login.usernamePw.password-input")}
      placeholder={"enter a password"}
      helpBlock={""}
    />
  );
};

PasswordInput.propTypes = {
  translate: PropTypes.func,
  validate: PropTypes.func,
};

export default InjectIntl(PasswordInput);

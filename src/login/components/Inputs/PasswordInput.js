import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import CustomInput from "./CustomInput";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

let PasswordInput = ({ translate, required }) => (
  <Field
    type="password"
    name="current-password"
    component={CustomInput}
    // id="current-password"
    autoComplete="current-password"
    required={required}
    label={"Password"}
    placeholder={"enter a password"}
    helpBlock={""}
    handleSubmit={() => {}}
  />
);

PasswordInput.propTypes = {
  translate: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func,
};

export default InjectIntl(PasswordInput);

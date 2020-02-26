import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import Input from "./Input";

let PasswordInput = props => (
  <Field
    type={"password"}
    name={"password"}
    label={"password"}
    componentclass={"input"}
    id={"password-input"}
    component={Input}
    translate={props.translate}
    placeholder={"this is password"}
  />
);

PasswordInput.propTypes = {
  l10n: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default PasswordInput;

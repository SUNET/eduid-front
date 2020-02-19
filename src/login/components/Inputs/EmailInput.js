import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import Input from "./Input";

let EmailInput = props => (
  <Field
    type={"email"}
    name={"email"}
    label={"email address"}
    inputclass={"input"}
    id={"email-input"}
    component={Input}
    l10n={props.l10n}
    placeholder={"example@email.com"}
  />
);

EmailInput.propTypes = {
  l10n: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default EmailInput;

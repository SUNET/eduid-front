import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import Input from "./Input";

let ConfirmationCodeInput = props => (
  <Field
    type={"text"}
    name={"confirmationCode"}
    label={"confirmation code"}
    inputclass={"input"}
    id={"confirmation-code-input"}
    component={Input}
    translate={props.translate}
    placeholder={"Enter confirmation code"}
  />
);

ConfirmationCodeInput.propTypes = {
  translate: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default ConfirmationCodeInput;

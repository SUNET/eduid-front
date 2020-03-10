import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import Input from "./Input";

let EmailInput = props => (
  <Field
    type={"email"}
    name={"email"}
    label={props.translate("profile.email_display_title")}
    inputclass={"input"}
    id={"email-input"}
    component={Input}
    translate={props.translate}
    placeholder={"example@email.com"}
  />
);

EmailInput.propTypes = {
  translate: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default EmailInput;

import React from "react";
import { Field } from "redux-form";
import CustomInput from "./CustomInput";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";

let EmailInput = ({ translate, required, autoFocus }) => (
  <Field
    required={required}
    label={translate("profile.email_display_title")}
    component={CustomInput}
    componentClass="input"
    type="email"
    name="email"
    helpBlock={translate("emails.input_help_text")}
    autoFocus={autoFocus}
    ariaLabel={"enter your email address to login"}
    autoComplete="username"
    placeholder="example@email.com"
  />
);

EmailInput.propTypes = {
  translate: PropTypes.func.isRequired,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default InjectIntl(EmailInput);

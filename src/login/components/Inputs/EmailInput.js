import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import CustomInput from "./CustomInput";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

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
  translate: PropTypes.func,
  validate: PropTypes.func,
};

export default InjectIntl(EmailInput);

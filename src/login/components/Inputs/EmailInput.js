import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import CustomInput from "./CustomInput";
import InjectIntl from "../../translation/InjectIntl_HOC_factory"

let EmailInput = ({ translate, required, autoFocus }) => (
  <Field
    required={required}
    label={translate("profile.email_display_title")}
    component={CustomInput}
    componentClass="input"
    autoFocus={autoFocus}
    ariaLabel={""}
    autoComplete="username"
    type="email"
    name="email"
    placeholder="example@example.com"
    helpBlock={translate("emails.input_help_text")}
  />
);

EmailInput.propTypes = {
  translate: PropTypes.func,
  validate: PropTypes.func,
};

export default InjectIntl(EmailInput);

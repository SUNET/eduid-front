import React from "react";
import { Field } from "redux-form";
import CustomInput from "./CustomInput";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { translate } from "login/translation";

const EmailInput = ({ required, autoFocus }) => {
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.email",
    defaultMessage: "name@example.com",
    description: "placeholder text for email input",
  });
  return (
    <Field
      required={required}
      label={translate("profile.email_display_title")}
      component={CustomInput}
      componentClass="input"
      type="email"
      name="email"
      autoFocus={autoFocus}
      ariaLabel={"enter your email address to login"}
      autoComplete="username"
      placeholder={placeholder}
    />
  );
};

EmailInput.propTypes = {
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default EmailInput;

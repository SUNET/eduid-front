import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form } from "reactstrap";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import CustomInput from "../login/components/Inputs/CustomInput";

const validate = (values, props) => {
  const inputName = props.inputName;
  let value = values[inputName];
  let errors = {};
  // Naming of regex patterns refer to matching long (UUID format) and short (10 characters) codes. This aligns with naming used in the backend
  // UUID format source from: https://en.wikipedia.org/wiki/Universally_unique_identifier#Format
  // longCodePattern is used to verify an added email address
  const longCodePattern = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;
  // shortCodePattern is used to verify an added phone number and vetting via letter and phone
  const shortCodePattern = /^[A-Za-z0-9]{10,12}$/;
   // securityKeyPattern is used to verify user's entered descriptions for security keys
  const securityKeyPattern = /^.{1,50}$/;

  if (!value) {
    errors[inputName] = "required";
    return errors;
  }

  value = value.trim();
  let pattern = /.*/;
  switch (inputName) {
    case "emailConfirmDialogControl": pattern = longCodePattern; break;
    case "phoneConfirmDialogControl": pattern = shortCodePattern; break;
    case "letterConfirmDialogControl": pattern = shortCodePattern; break;
    case "describeWebauthnTokenDialogControl": pattern = securityKeyPattern; break;
    default:
      break;
  }
  if (!pattern.test(value)){
    errors[inputName] = "invalid format";
  }
  return errors;
}
class ConfirmModalForm extends Component {
  render() {
    return (
      <div id="modal-form">
        <Form id={this.props.inputName + "-form"} role="form">
          <div id="confirmation-code-area">
            <Field
              component={CustomInput}
              componentClass="input"
              type="text"
              label={this.props.resendLabel}
              placeholder={this.props.placeholder}
              id={this.props.inputName}
              name={this.props.inputName}
              helpBlock={this.props.helpBlock}
            />
          </div>
        </Form>
      </div>
    );
  }
}

ConfirmModalForm = reduxForm({
  form: "modal-form",
  validate: validate
})(ConfirmModalForm);

ConfirmModalForm = connect(state => ({
  initialValues: {}
}))(ConfirmModalForm);

export default i18n(ConfirmModalForm);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form } from "reactstrap";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import CustomInput from "../login/components/Inputs/CustomInput";

const validate = (values, props) => {
  let inputName = props.inputName;
  const errors = {};
  const code = values[inputName];
  const spacePattern = /^\s+$/;
  // Backend use UUID format for emailconfirmcode: https://en.wikipedia.org/wiki/Universally_unique_identifier#Format
  const emailUUIDFormatPattern = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;
  // Phone, Letter proofing pattern
  const shortConfirmCodeLength = /^[A-Za-z0-9]{10,12}$/;
  const securityKeyLengthPattern = /^.{1,50}$/;

  if (!code) {
    errors[inputName] = "required";
  }
  else if(spacePattern.test(values[inputName])){
    errors[inputName] = "required";
  }
  else if(inputName.includes("email")) {
    if (!emailUUIDFormatPattern.test(values.emailConfirmDialogControl)){
      errors[inputName] = "emails.invalid_code";
    }
  }
  else if(inputName.includes("phone")) {
    if (!shortConfirmCodeLength.test(values.phoneConfirmDialogControl)){
      errors[inputName] = "mobile.confirm_code_wrong_length";
    }
  }
  else if(inputName.includes("letter")) {
    if (!shortConfirmCodeLength.test(values.letterConfirmDialogControl)){
      errors[inputName] = "mobile.confirm_code_wrong_length";
    }
  }
  else if(inputName.includes("describeWebauthnToken")) {
    if (!securityKeyLengthPattern.test(values.describeWebauthnTokenDialogControl)){
      errors[inputName] = "security.confirm_security_length";
    }
  }
  return errors;
};

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

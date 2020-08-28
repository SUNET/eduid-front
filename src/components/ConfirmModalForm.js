import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form } from "reactstrap";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import CustomInput from "../login/components/Inputs/CustomInput";

const validate = (values, props) => {
  let inputName = props.inputName;
  console.log('[inputName]', inputName);
  const errors = {};
  const code = values[inputName];
  if (!code) {
    errors[inputName] = "required";
  }
  // Backend use UUID format for emailconfirmcode: https://en.wikipedia.org/wiki/Universally_unique_identifier#Format
  const emailPattern = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;
  if(inputName.includes("email")) {
    if (!emailPattern.test(values.emailConfirmDialogControl)){
      errors[inputName] = "cm.invalid_code";
    }
    if (values.length !== 36){
      errors[inputName] = "emails.confirm_code_wrong_length";
    }
  }
  const phonePattern = /^[A-Za-z0-9]{10,12}$/;
  if(inputName.includes("phone")) {
    if (!phonePattern.test(values.phoneConfirmDialogControl)){
      errors[inputName] = "mobile.confirm_code_wrong_length";
    }
  }
  const securityKeyPattern = /^.{1,50}$/;
  if(inputName.includes("describeWebauthnToken")) {
    if (!securityKeyPattern.test(values.describeWebauthnTokenDialogControl)){
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

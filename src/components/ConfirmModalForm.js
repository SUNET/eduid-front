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
  if (!code) {
    errors[inputName] = "required";
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

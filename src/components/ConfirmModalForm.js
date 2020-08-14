import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ButtonGroup, Form } from "reactstrap";
import Button from "reactstrap/lib/Button";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";

import i18n from "../login/translation/InjectIntl_HOC_factory";
// import TextInput from "components/EduIDTextInput";
import CustomInput from"../login/components/Inputs/CustomInput";
import EduIDButton from "components/EduIDButton";
import NotificationsContainer from "containers/Notifications";

const validate = (values, props) => {
  console.log("validate - values", values);
  console.log("valiadate - props.inputName", props.inputName);
  console.log("valiadate - this.props.inputName", props.inputName);
  let inputName = props.inputName;
  console.log("valiadate - inputName", inputName);
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

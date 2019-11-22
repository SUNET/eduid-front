import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextInput from "components/EduIDTextInput";
import { Field, reduxForm } from "redux-form";
import {
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import EduIDButton from "components/EduIDButton";
import "style/Email.scss";

/* FORM */

const validate = values => {
  const errors = {},
    email = values.email,
    pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email) {
    errors.email = "required";
  } else if (!pattern.test(email)) {
    errors.email = "email.invalid_email";
  }
  return errors;
};

let EmailForm = props => (
  <div id="register-input-group">
    <fieldset id="register-form">
      <Field
        type="email"
        name="email"
        componentClass="input"
        id="email-input"
        component={TextInput}
        l10n={props.l10n}
        placeholder="example@email.com"
      />
    </fieldset>
    <EduIDButton
      className="settings-button"
      id="register-button"
      disabled={props.invalid}
      onClick={props.handleEmail}
    >
      {props.l10n("email.sign-up-email")}
    </EduIDButton>
    <FormFeedback>{props.touched && props.l10n(error)}</FormFeedback>
  </div>
);

EmailForm = reduxForm({
  form: "emailForm",
  validate
})(EmailForm);

EmailForm = connect(state => ({
  enableReinitialize: true
}))(EmailForm);

/* COMPONENT */

class Email extends Component {
  render() {
    return [
      <div key="0" id="register-container">
        <label>Email address</label>
        <EmailForm {...this.props} />
      </div>,
      <div key="1">
        <Modal isOpen={this.props.acceptingTOU} id="register-modal">
          <ModalHeader>{this.props.l10n("tou.header")}</ModalHeader>
          <ModalBody dangerouslySetInnerHTML={{ __html: this.props.tou }} />
          <ModalFooter>
            <EduIDButton
              id="accept-tou-button"
              className="modal-button ok-button"
              onClick={this.props.handleAccept}
            >
              {this.props.l10n("tou.accept")}
            </EduIDButton>
            <EduIDButton
              className="modal-button cancel-button"
              id="reject-tou-button"
              onClick={this.props.handleReject}
            >
              {this.props.l10n("tou.cancel")}
            </EduIDButton>
          </ModalFooter>
        </Modal>
      </div>
    ];
  }
}

Email.propTypes = {
  acceptingTOU: PropTypes.bool,
  tou: PropTypes.string,
  size: PropTypes.string,
  l10n: PropTypes.func,
  handleAccept: PropTypes.func,
  handleReject: PropTypes.func
};

export default Email;

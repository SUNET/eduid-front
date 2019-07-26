import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextInput from "components/EduIDTextInput";
import { Field, reduxForm } from "redux-form";
import {
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";

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
    <Form id="register-form">
      <Field
        type="email"
        name="email"
        componentClass="input"
        id="email-input"
        component={TextInput}
        l10n={props.l10n}
        placeholder="example@email.com"
      />
    </Form>
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
    // const url = window.location.href;
    // let buttons = "";
    // if (this.props.withButtons) {  onClick={this.props.gotoSignin} onClick={this.props.gotoSignup} {this.props.l10n("header.signup")} data-dashboard_url={this.props.dashboard_url}
    // if (url.includes("register")) {
    //   buttons = (
    //     <div data-dashboard_url={this.props.dashboard_url}>
    //       <EduIDButton
    //         className="btn-link "
    //         onClick={this.props.gotoSignin}
    //       >
    //         {this.props.l10n("header.signin")}
    //       </EduIDButton>
    //     </div>
    //   );
    // } else {
    //   buttons = (
    //     <div>
    //       <a onClick={this.props.gotoSignup}>
    //         {this.props.l10n("header.signup")}
    //       </a>
    //     </div>
    //   );
    // }
    return [
      <div key="0" id="register-container">
        <label>Email address</label>
        <EmailForm {...this.props} />
        {/* <div data-dashboard_url={this.props.dashboard_url}>
          <EduIDButton
            id="login-button"
            className="btn-link"
            onClick={this.props.gotoSignin}
          >
            {this.props.l10n("header.signin")}
          </EduIDButton>
        </div> */}
        {/* <p>{this.props.l10n("register.why-account")}</p> */}
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

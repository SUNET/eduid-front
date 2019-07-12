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

const registerEmailField = ({
  input,
  id,
  type,
  placeholder,
  handleEmail,
  l10n,
  meta: { touched, error }
}) => (
  <Input
    {...input}
    id={id}
    invalid={touched && Boolean(error)}
    valid={!touched || !Boolean(error)}
    placeholder={placeholder}
    type={type}
  />
);

// const renderSmallField = ({
//   input,
//   id,
//   type,
//   placeholder,
//   handleEmail,
//   l10n,
//   meta: { touched, error }
// }) => (
//   <div className="input-group">
//     <Input
//       {...input}
//       id={id}
//       invalid={touched && Boolean(error)}
//       valid={!touched || !Boolean(error)}
//       placeholder={placeholder}
//       type={type}
//     />
//     <EduIDButton id="email-button" onClick={handleEmail}>
//       {l10n("email.sign-up-email")}
//     </EduIDButton>
//     <span className="float-left">
//       <FormFeedback className="float-left">
//         {touched && l10n(error)}
//       </FormFeedback>
//     </span>
//   </div>
// );

// const getField = size => {
//   if (size === "xs") return renderSmallField;
//   return renderLargeField;
// };

let EmailForm = props => (
  <div id="register-input-group">
    <Form id="register-form">
      <Field
        type="email"
        name="email"
        id="email-input"
        component={registerEmailField}
        handleEmail={props.handleEmail.bind(props)}
        l10n={props.l10n}
        placeholder="name@example.edu"
      />
    </Form>
    <EduIDButton
      className="settings-button"
      id="register-button"
      onClick={props.handleEmail}
    >
      {props.l10n("email.sign-up-email")}
    </EduIDButton>
    <FormFeedback className="">
      {props.touched && props.l10n(error)}
    </FormFeedback>
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
        <p>{this.props.l10n("register.why-account")}</p>
      </div>,
      <div key="1" className="email-modal">
        <Modal isOpen={this.props.acceptingTOU}>
          <ModalHeader>{this.props.l10n("tou.header")}</ModalHeader>
          <ModalBody dangerouslySetInnerHTML={{ __html: this.props.tou }} />
          <ModalFooter>
            <EduIDButton
              id="modal-button ok-button"
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

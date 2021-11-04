import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CustomInput from "../Inputs/CustomInput";
import { Field, reduxForm, submit } from "redux-form";
import Form from "reactstrap/lib/Form";
import EduIDButton from "components/EduIDButton";
import NotificationModal from "../Modals/NotificationModal";
import { validate } from "../../app_utils/validation/validateEmail";
import * as actions from "actions/Email";


const submitEmailForm = (values, dispatch) => {
  const { email } = values;
  dispatch(actions.addEmail(email));
};

/* FORM */
let EmailForm = (props) => (
  <Form id="register-form" role="form">
    <Field
      type="email"
      name="email"
      label={props.translate("signup.registering-input")}
      componentClass="input"
      id="email-input"
      component={CustomInput}
      translate={props.translate}
      placeholder="name@example.com"
    />
    <EduIDButton
      className="settings-button"
      id="register-button"
      disabled={props.invalid}
      onClick={() => props.dispatch(submit("emailForm"))}
    >
      {props.translate("email.sign-up-email")}
    </EduIDButton>
  </Form>
);

EmailForm = reduxForm({
  form: "emailForm",
  validate,
  onSubmit: submitEmailForm,
})(EmailForm);

EmailForm = connect(() => ({
  enableReinitialize: true,
  destroyOnUnmount: false,
}))(EmailForm);

/* COMPONENT */

class RegisterEmail extends Component {
  render() {
    return [
      <div key="0" id="content" className="horizontal-content-margin">
        <p className="heading">
          {this.props.translate("register.sub-heading")}
        </p>
        <p>{this.props.translate("register.paragraph")}</p>

        <EmailForm {...this.props} />
        <p className="text-link-container">
          <span>{this.props.translate("register.toLogin")}</span>
          <a className="text-link" href={this.props.dashboard_url}>
            <span>{this.props.translate("text.link")}</span>
          </a>
        </p>
      </div>,
      <div key="1">
        <NotificationModal
          modalId="register-modal"
          title={this.props.translate("tou.header")}
          showModal={this.props.acceptingTOU}
          closeModal={this.props.handleReject}
          acceptModal={this.props.handleAccept}
          mainText={this.props.tou}
          acceptButtonText={this.props.translate("tou.accept")}
          closeButtonText={this.props.translate("tou.cancel")}
          acceptButtonId={"accept-tou-button"}
          closeButtonId={"reject-tou-button"}
        />
      </div>,
    ];
  }
}

RegisterEmail.propTypes = {
  acceptingTOU: PropTypes.bool,
  tou: PropTypes.string,
  translate: PropTypes.func,
  handleAccept: PropTypes.func,
  handleReject: PropTypes.func,
};

export default RegisterEmail;

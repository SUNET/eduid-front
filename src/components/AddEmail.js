import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CustomInput from "../login/components/Inputs/CustomInput";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import EduIDButton from "components/EduIDButton";
import GenericConfirmModal from "components/GenericConfirmModal";
import { validate } from "../login/app_utils/validation/validateEmail";

/* FORM */
let EmailForm = (props) => (
  <Form id="register-form" role="form" onSubmit={props.handleEmail}>
    <Field
      type="email"
      name="email"
      label={props.translate("signup.registering-input")}
      componentClass="input"
      id="email-input"
      component={CustomInput}
      translate={props.translate}
      placeholder="example@email.com"
    />
    <EduIDButton
      className="settings-button"
      id="register-button"
      disabled={props.invalid}
      onClick={props.handleEmail}
    >
      {props.translate("email.sign-up-email")}
    </EduIDButton>
  </Form>
);

EmailForm = reduxForm({
  form: "emailForm",
  validate,
})(EmailForm);

EmailForm = connect((state) => ({
  enableReinitialize: true,
  destroyOnUnmount: false,
}))(EmailForm);

/* COMPONENT */

class AddEmail extends Component {
  render() {
    return [
      <div key="0" id="content" className="vertical-content-margin">
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
        <GenericConfirmModal 
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
      </div>
    ];
  }
}

AddEmail.propTypes = {
  acceptingTOU: PropTypes.bool,
  tou: PropTypes.string,
  translate: PropTypes.func,
  handleAccept: PropTypes.func,
  handleReject: PropTypes.func,
};

export default AddEmail;
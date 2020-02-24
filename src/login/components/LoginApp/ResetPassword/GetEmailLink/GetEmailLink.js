import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import EmailInput from "../../../Inputs/EmailInput";
import ButtonPrimary from "../../../Buttons/ButtonPrimary";
// import ButtonRedirect from "../../ButtonPrimary";

import { validate } from "../../../../app_utils/validation/validateEmail";

let EmailForm = props => (
  // console.log("this is props in Email Form", props),
  (
    <form id="reset-password-email-form" className="form">
      <EmailInput {...props} />
      <ButtonPrimary
        // className={"settings-button"}
        // id={"register-button"}
        disabled={props.invalid}
        onClick={props.handleEmailInput}
      >
        Send me a link
      </ButtonPrimary>
    </form>
  )
);

EmailForm = reduxForm({
  form: "email-form",
  validate
})(EmailForm);

EmailForm = connect(state => ({
  enableReinitialize: true
}))(EmailForm);

class GetEmailLink extends Component {
  render() {
    // console.log("this is props in EmailLink", this.props);
    return (
      <React.Fragment>
        <EmailForm {...this.props} />
        <p>
          <span className="sub-heading">For your security:</span> You may be
          asked to prove that you are the owner of your eduID before resetting
          the password.
        </p>
      </React.Fragment>
    );
  }
}

GetEmailLink.propTypes = {
  l10n: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default withRouter(GetEmailLink);

import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "i18n-messages";

import { ButtonGroup, Form } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { FormFeedback } from "reactstrap";

import EduIDButton from "components/EduIDButton";
import ChangePasswordForm from "components/ChangePasswordForm";
import ConfirmModal from "components/ConfirmModal";


class DoReset extends Component {

  render() {
    // Show the user a form to change the password.
    // Once the form is valid and the user clicks on the submit button,
    // if the user has chosen to use extra security with a phone number,
    // show a modal with an input for the SMS'd code.
    return (
      <div>
        <h3 className="reset-password-code-header">
          {this.props.l10n("resetpw.choose-your-password")}
        </h3>
        <div>
          <ChangePasswordForm require_old_password={false} {...this.props} />
        </div>
        <ConfirmModal
          modalId="smsCodeDialog"
          id="smsCodeDialogControl"
          title={this.props.l10n("resetpw.enter-sms-code")}
          with_resend_link={false}
          showModal={this.props.password_chosen_sms}
          closeModal={this.props.handleStopSMSCodeConfirmation}
          handleConfirm={this.props.handleSMSCodeConfirm.bind(this)}
        />
      </div>
    );
  }
}

DoReset.propTypes = {
};

export default DoReset;

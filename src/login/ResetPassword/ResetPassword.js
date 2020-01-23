import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "i18n-messages";

import "./ResetPassword.scss";

import InitFormContainer from "login/InitialResetForm/InitialResetForm_container";


class ResetPassword extends Component {

  render() {
    let markup;
    if (this.props.email_sent) {
      markup = (
        <div>
          <h3 className="resetting-password-header">
            {this.props.l10n("resetpass.email-sent-title")}
          </h3>
          {this.props.l10n("resetpass.email-sent")}
        </div>
      );
    } else {
      markup = (
        <div>
          <h3 className="reset-password-header">
            {this.props.l10n("resetpass.main_title")}
          </h3>
          <InitFormContainer />
        </div>
      );
    }
    return (markup);
  }
}

ResetPassword.propTypes = {
  email_sent: PropTypes.bool,
};

export default ResetPassword;

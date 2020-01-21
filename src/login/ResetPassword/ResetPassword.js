import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "i18n-messages";

import "./ResetPassword.scss";

import InitFormContainer from "login/InitialResetForm/InitialResetForm_container";


class ResetPassword extends Component {

  render() {
    return (
      <div>
        <h3 className="reset-password-header">
          {this.props.l10n("resetpass.main_title")}
        </h3>
        <InitFormContainer />
      </div>
    );
  }
}

ResetPassword.propTypes = {
};

export default ResetPassword;

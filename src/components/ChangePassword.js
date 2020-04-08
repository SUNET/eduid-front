import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as comp from "components/ChangePasswordForm";
import * as actions from "actions/ChangePassword";
import { stopConfirmationPassword } from "actions/Security";

import i18n from "../login/translation/InjectIntl_HOC_factory";
import ChangePasswordForm from "./ChangePasswordForm";
import DashboardNav from "./DashboardNav";

// import "style/ChangePassword.scss";
import "../login/styles/index.scss";

class ChangePassword extends Component {
  componentWillMount() {
    this.props.loadZxcvbn();
  }

  render() {
    return (
      <div id="dashboard">
        <div id="password-wrapper">
          <DashboardNav {...this.props} />
          <div id="password-container">
            <h3 className="verify-identity-header">
              {this.props.translate("chpass.main_title")}
            </h3>
            <div id="changePasswordDialog">
              <ChangePasswordForm {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  user_input: PropTypes.array,
  next_url: PropTypes.string,
  password_entropy: PropTypes.number,
  handleChoice: PropTypes.func,
  noop: PropTypes.func,
  handleStartPasswordChange: PropTypes.func,
  cancel_to: PropTypes.string
};

export default ChangePassword;

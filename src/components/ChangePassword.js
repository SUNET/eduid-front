import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as comp from "components/ChangePasswordForm";
import * as actions from "actions/ChangePassword";
import { stopConfirmationPassword } from "actions/Security";

import i18n from "i18n-messages";
import ChangePasswordForm from "./ChangePasswordForm";
import DashboardNav from "./DashboardNav";

import "style/ChangePassword.scss";
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
              {this.props.l10n("chpass.main_title")}
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

// export default ChangePassword;

const pwStrengthMessages = [
  "pwfield.terrible",
  "pwfield.bad",
  "pwfield.weak",
  "pwfield.good",
  "pwfield.strong"
];

const mapStateToProps = (state, props) => {
  let userInput = [];
  userInput.push(state.personal_data.data.given_name);
  userInput.push(state.personal_data.data.surname);
  userInput.push(state.personal_data.data.display_name);
  userInput.concat(state.emails.emails);
  const customPassword =
    (state.form &&
      state.form.chpass &&
      state.form.chpass.values &&
      state.form.chpass.values[comp.pwFieldCustomName]) ||
    "";
  let score = 0,
    configEntropy = state.config.PASSWORD_ENTROPY,
    minEntropy = configEntropy / 5,
    stepEntropy = minEntropy,
    entropy = 0;
  if (state.chpass.zxcvbn_module) {
    const result = state.chpass.zxcvbn_module(customPassword, userInput);
    entropy = Math.log(result.guesses, 2);
    for (let n = 0; n < 5 && entropy > minEntropy; n++) {
      score = n;
      minEntropy += stepEntropy;
    }
  }

  return {
    suggested_password: state.chpass.suggested_password,
    next_url: state.chpass.next_url,
    password_entropy: configEntropy,
    password_score: score,
    password_strength_msg: pwStrengthMessages[score],
    custom_ready: configEntropy > entropy,
    cancel_to: "security"
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    noop: function(event) {
      event.preventDefault();
    },

    handleStartPasswordChange: function(event) {
      event.preventDefault();
      const oldPassword = document.getElementsByName(comp.pwFieldOldName)[0]
        .value;
      let newPassword = this.props.suggested_password;
      if (this.state.rSelected === "custom") {
        newPassword = document.getElementsByName(comp.pwFieldCustomName)[0]
          .value;
      }
      dispatch(actions.postPasswordChange(oldPassword, newPassword));
    },

    handleStopPasswordChange: function(event) {
      event.preventDefault();
      this.props.history.push(this.props.cancel_to);
      dispatch(stopConfirmationPassword());
    },

    loadZxcvbn: function() {
      return new Promise(resolve => {
        require.ensure([], () => {
          const module = require("zxcvbn");
          dispatch(actions.setZxcvbn(module));
          resolve();
        });
      });
    }
  };
};

const ChangePasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

export default i18n(ChangePasswordContainer);

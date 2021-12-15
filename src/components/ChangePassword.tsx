import { fetchSuggestedPassword } from "apis/eduidSecurity";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
//import * as comp from "components/ChangePasswordForm";
//import * as actions from "actions/ChangePassword";
//import { stopConfirmationPassword } from "actions/Security";
import { DashboardRootState } from "dashboard-init-app";
import { translate } from "login/translation";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import zxcvbn from "zxcvbn";
import ChangePasswordForm, { pwFieldCustomName } from "./ChangePasswordForm";

export interface ChangePasswordProps {
  suggested_password?: string;
  password_entropy: number;
  password_score: number;
  password_strength_msg: string; // "pwfield.terrible" or "pwfield.bad" or ...
  custom_ready: boolean; // appears to be 'true' if custom password has entropy LOWER than limit in config
  cancel_to: string; // URL to send browser to if user cancels change password
}

function ChangePassword(props: ChangePasswordProps) {
  // componentWillMount() {
  //   this.props.loadZxcvbn();
  // }
  const suggested_password = useDashboardAppSelector((state) => state.chpass.suggested_password);
  const is_app_loaded = useDashboardAppSelector((state) => state.config.is_app_loaded);
  const dispatch = useDashboardAppDispatch();

  useEffect(() => {
    if (is_app_loaded && suggested_password === undefined) {
      // call fetchSuggestedPassword once state.config.security_url is initialised
      dispatch(fetchSuggestedPassword());
    }
  }, [suggested_password, is_app_loaded]);

  return (
    <Fragment>
      <div className="intro">
        <h4>{translate("chpass.main_title")}</h4>
      </div>
      <div id="changePasswordDialog">
        <ChangePasswordForm {...props} />
      </div>
    </Fragment>
  );
}

// ChangePassword.propTypes = {
//   user_input: PropTypes.array,
//   next_url: PropTypes.string,
//   password_entropy: PropTypes.number,
//   handleChoice: PropTypes.func,
//   noop: PropTypes.func,
//   handleStartPasswordChange: PropTypes.func,
//   cancel_to: PropTypes.string,
// };

const pwStrengthMessages = ["pwfield.terrible", "pwfield.bad", "pwfield.weak", "pwfield.good", "pwfield.strong"];

const mapStateToProps = (state: DashboardRootState): ChangePasswordProps => {
  let userInput: string[] = [];
  if (state.personal_data.data.given_name) userInput.push(state.personal_data.data.given_name);
  if (state.personal_data.data.surname) userInput.push(state.personal_data.data.surname);
  if (state.personal_data.data.display_name) userInput.push(state.personal_data.data.display_name);
  userInput = userInput.concat(state.emails.emails);
  const customPassword =
    (state.form && state.form.chpass && state.form.chpass.values && state.form.chpass.values[pwFieldCustomName]) || "";
  const configEntropy = state.config.password_entropy;

  let score = 0,
    minEntropy = configEntropy / 5,
    entropy = 0;
  const stepEntropy = minEntropy;
  const result = zxcvbn(customPassword, userInput);
  entropy = Math.log(result.guesses);
  for (let n = 0; n < 5 && entropy > minEntropy; n++) {
    score = n;
    minEntropy += stepEntropy;
  }

  return {
    suggested_password: state.chpass.suggested_password,
    password_entropy: configEntropy,
    password_score: score,
    password_strength_msg: pwStrengthMessages[score],
    custom_ready: configEntropy > entropy,
    cancel_to: "security",
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     noop: function (event) {
//       event.preventDefault();
//     },

//     // handleStartPasswordChange: function (event) {
//     //   event.preventDefault();
//     //   const oldPassword = document.getElementsByName(comp.pwFieldOldName)[0].value;
//     //   let newPassword = this.props.suggested_password;
//     //   if (this.state.customPassword) {
//     //     newPassword = document.getElementsByName(comp.pwFieldCustomName)[0].value;
//     //   }
//     //   dispatch(actions.postPasswordChange(oldPassword, newPassword));
//     // },

//     // handleStopPasswordChange: function (event) {
//     //   event.preventDefault();
//     //   this.props.history.push(this.props.cancel_to);
//     //   dispatch(stopConfirmationPassword());
//     // },

//     // loadZxcvbn: function () {
//     //   return new Promise((resolve) => {
//     //     const module = require("zxcvbn");
//     //     dispatch(actions.setZxcvbn(module));
//     //     resolve();
//     //   });
//     // },
//   };
// };

export const ChangePasswordContainer = connect(mapStateToProps)(ChangePassword);

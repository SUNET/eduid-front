import { connect } from "react-redux";
import * as zxcvbn from "zxcvbn";

import i18n from "i18n-messages";
import * as comp from "components/ChangePasswordForm";
import * as actions from "login/DoReset/DoReset_actions";

import DoReset from "login/DoReset/DoReset";
import { history } from "login/LoginMain/LoginMain";


const pwStrengthMessages = [
  "pwfield.terrible",
  "pwfield.bad",
  "pwfield.weak",
  "pwfield.good",
  "pwfield.strong"
];

export function hasWebauthnSupport() {
  return
    navigator.credentials &&
    navigator.credentials.get !== undefined &&
    navigator.credentials.create !== undefined
}

const mapStateToProps = (state, props) => {
  let userInput = state.config.zxcvbn_terms;
  const customPassword =
    (state.form &&
      state.form.chpass &&
      state.form.chpass.values &&
      state.form.chpass.values[comp.pwFieldCustomName]) ||
    "";
  let score = 0,
    configEntropy = state.config.password_entropy,
    minEntropy = configEntropy / 5,
    stepEntropy = minEntropy,
    entropy = 0;

  const result = zxcvbn(customPassword, userInput);
  entropy = Math.log(result.guesses, 2);
  for (let n = 0; n < 5 && entropy > minEntropy; n++) {
    score = n;
    minEntropy += stepEntropy;
  }
  let options = {};
  if (state.config.extra_security.tokens && hasWebauthnSupport()) {
    try {
      options = { ...state.config.extra_security.tokens };
      options.publicKey = {
        ...options.publicKey,
        challenge: Uint8Array.from(
          Array.prototype.map.call(atob(options.publicKey.challenge), function(
            x
          ) {
            return x.charCodeAt(0);
          })
        )
      };
      const allowCreds = options.publicKey.allowCredentials.map(v => {
        return {
          ...v,
          id: Uint8Array.from(
            Array.prototype.map.call(atob(v.id), function(x) {
              return x.charCodeAt(0);
            })
          )
        };
      });
      options.publicKey.allowCredentials = allowCreds;
    } catch (error) {
      // the credentials were registered as webauthn (not U2F)
      options = { ...state.config.extra_security.tokens };
    }
  }
  return {
    password_chosen_sms: state.do_reset.password_chosen_sms,
    choose_extrasec: state.resetting.choose_extrasec,
    suggested_password: state.config.suggested_password,
    new_password: state.do_reset.new_password,
    password_entropy: configEntropy,
    password_score: score,
    password_strength_msg: pwStrengthMessages[score],
    custom_ready: configEntropy > entropy,
    cancel_to: "/reset-password/",
    webauthn_options: options,
    assertion: state.do_reset.webauthn_assertion,
  };
};


let credentials_locked = false;


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleStartPasswordChange: function(event) {
      event.preventDefault();
      let newPassword = this.props.suggested_password;
      if (this.state.rSelected === "custom") {
        newPassword = document.getElementsByName(comp.pwFieldCustomName)[0].value;
      }
      dispatch(actions.passwordToReset(newPassword));
      if (this.props.choose_extrasec === 'none') {
        dispatch(actions.doResetPassword());
      } else if (this.props.choose_extrasec === 'phone') {
        dispatch(actions.askForSMSCode());
      } else if (this.props.choose_extrasec === 'token') {
        dispatch(actions.askForTokenAndReset());
      }
    },

    handleStopPasswordChange: function(event) {
      event.preventDefault();
      history.push(this.props.cancel_to);
    },
    handleStopSMSCodeConfirmation: function(event) {
      dispatch(actions.stopResetPasswordSMS());
    },
    handleSMSCodeConfirm: function(event) {
      const newPassword = this.props.new_password;
      dispatch(actions.passwordToReset(newPassword));
      const code = document.getElementsByName('smsCodeDialogControl')[0].value;
      dispatch(actions.doResetPasswordSMS(code));
    },
    retry: function(e) {
      e.preventDefault();
      dispatch(actions.retry());
    }
  };
};

const DoResetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DoReset);

export default i18n(DoResetContainer);

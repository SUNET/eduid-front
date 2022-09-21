import {
  chooseAuthenticator, initiatePasswordChange, postRemoveWebauthnToken,
  postVerifyWebauthnToken, startAskWebauthnDescription, startWebauthnRegistration, stopAskWebauthnDescription
} from "actions/Security";
import Security from "components/Security";
import { connect } from "react-redux";
import { clearNotifications } from "reducers/Notifications";

const mapStateToProps = (state) => {
  return {
    credentials: state.security.credentials,
    confirming_change: state.security.confirming_change,
    redirect_to: state.security.location,
    deleted: state.security.deleted,
    webauthn_asking_description: state.security.webauthn_asking_description,
    authenticator: state.security.webauthn_authenticator,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleConfirmationPassword: () => {
      dispatch(initiatePasswordChange());
    },
    handleStartAskingKeyWebauthnDescription: function () {
      dispatch(clearNotifications());
      dispatch(chooseAuthenticator("cross-platform"));
      dispatch(startAskWebauthnDescription());
    },
    handleStartAskingDeviceWebauthnDescription: function () {
      dispatch(clearNotifications());
      dispatch(chooseAuthenticator("platform"));
      dispatch(startAskWebauthnDescription());
    },
    handleStopAskingWebauthnDescription: function () {
      dispatch(stopAskWebauthnDescription());
    },
    handleStartWebauthnRegistration: function () {
      const description = document.getElementById("describe-webauthn-token-modal").value.trim();
      dispatch(stopAskWebauthnDescription());
      dispatch(startWebauthnRegistration(description));
    },
    handleRemoveWebauthnToken: function (e) {
      const token = e.target.closest(".webauthn-token-holder").dataset.token;
      dispatch(postRemoveWebauthnToken(token));
    },
    handleVerifyWebauthnToken: function (e) {
      const token = e.target.closest(".webauthn-token-holder").dataset.token;
      dispatch(postVerifyWebauthnToken(token));
    },
  };
};

const SecurityContainer = connect(mapStateToProps, mapDispatchToProps)(Security);

export default SecurityContainer;

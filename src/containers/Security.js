import { connect } from "react-redux";
import Security from "components/Security";
import {
  initiatePasswordChange,
  confirmDeletion,
  stopConfirmationDeletion,
  startConfirmationDeletion,
  postRemoveWebauthnToken,
  postVerifyWebauthnToken,
  startWebauthnRegistration,
  startAskWebauthnDescription,
  stopAskWebauthnDescription,
  chooseAuthenticator,
} from "actions/Security";
import { clearNotifications } from "reducers/Notifications";

const mapStateToProps = (state) => {
  return {
    credentials: state.security.credentials,
    confirming_change: state.security.confirming_change,
    confirming_deletion: state.security.confirming_deletion,
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
    handleStartConfirmationDeletion: function () {
      dispatch(clearNotifications());
      dispatch(startConfirmationDeletion());
    },
    handleStopConfirmationDeletion: function () {
      dispatch(stopConfirmationDeletion());
    },
    handleConfirmationDeletion: function () {
      dispatch(confirmDeletion());
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
      const description = document.getElementById("describeWebauthnTokenDialog").value.trim();
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

import { connect } from "react-redux";
import Security from "components/Security";
import {
  confirmPasswordChange,
  startConfirmationPassword,
  stopConfirmationPassword,
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
import { eduidRMAllNotify } from "actions/Notifications";
import i18n from "../login/translation/InjectIntl_HOC_factory";

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
    handleStartConfirmationPassword: function () {
      dispatch(eduidRMAllNotify());
      dispatch(startConfirmationPassword());
    },
    handleStopConfirmationPassword: function () {
      dispatch(stopConfirmationPassword());
    },
    handleConfirmationPassword: () => {
      dispatch(confirmPasswordChange());
    },
    handleStartConfirmationDeletion: function () {
      dispatch(eduidRMAllNotify());
      dispatch(startConfirmationDeletion());
    },
    handleStopConfirmationDeletion: function () {
      dispatch(stopConfirmationDeletion());
    },
    handleConfirmationDeletion: function () {
      dispatch(confirmDeletion());
    },
    handleStartAskingKeyWebauthnDescription: function () {
      dispatch(eduidRMAllNotify());
      dispatch(chooseAuthenticator("cross-platform"));
      dispatch(startAskWebauthnDescription());
    },
    handleStartAskingDeviceWebauthnDescription: function () {
      dispatch(eduidRMAllNotify());
      dispatch(chooseAuthenticator("platform"));
      dispatch(startAskWebauthnDescription());
    },
    handleStopAskingWebauthnDescription: function () {
      dispatch(stopAskWebauthnDescription());
    },
    handleStartWebauthnRegistration: function () {
      const description = document
        .getElementById("describeWebauthnTokenDialogControl")
        .value.trim();
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

const SecurityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Security);

export default i18n(SecurityContainer);


import { connect } from 'react-redux';
import Security from 'components/Security';
import { confirmPasswordChange, startConfirmationPassword, stopConfirmationPassword,
         confirmDeletion, stopConfirmationDeletion, startConfirmationDeletion,
         postRemoveWebauthnToken, postVerifyWebauthnToken,
         startWebauthnRegistration, stopWebauthnRegistration,
         startAskWebauthnDescription, stopAskWebauthnDescription} from "actions/Security";
import { eduidRMAllNotify } from "actions/Notifications";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
    return {
        credentials: state.security.credentials,
        confirming_change: state.security.confirming_change,
        confirming_deletion: state.security.confirming_deletion,
        redirect_to: state.security.location,
        deleted: state.security.deleted,
        webauthn_asking_description: state.security.webauthn_asking_description,
        webauthn_begun: state.security.webauthn_begun
    }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
     handleStartConfirmationPassword: function (e) {
        dispatch(eduidRMAllNotify());
        dispatch(startConfirmationPassword());
    },
    handleStopConfirmationPassword: function (e) {
        dispatch(stopConfirmationPassword());
    },
    handleConfirmationPassword: (e) => {
        dispatch(confirmPasswordChange());
    },
    handleStartConfirmationDeletion: function (e) {
        dispatch(eduidRMAllNotify());
        dispatch(startConfirmationDeletion());
    },
    handleStopConfirmationDeletion: function (e) {
        dispatch(stopConfirmationDeletion());
    },
    handleConfirmationDeletion: function (e) {
        dispatch(confirmDeletion());
    },
    handleStartAskingWebauthnDescription: function (e) {
        dispatch(eduidRMAllNotify());
        dispatch(startAskWebauthnDescription());
    },
    handleStopAskingWebauthnDescription: function (e) {
        dispatch(stopAskWebauthnDescription());
    },
    handleStartWebauthnRegistration: function (e) {
        const description = document.getElementById('describeWebauthnTokenDialogControl').children[0];
        dispatch(stopAskWebauthnDescription());
        dispatch(startWebauthnRegistration(description));
    },
    handleCloseWebauthnModal: function (e) {
        dispatch(stopWebauthnRegistration());
    },
    handleRemoveWebauthnToken: function (e) {
        const token = e.target.closest('.webauthn-token-holder').dataset.token;
        dispatch(postRemoveWebauthnToken(token));
    },
    handleVerifyWebauthnToken: function (e) {
        const token = e.target.closest('.webauthn-token-holder').dataset.token;
        dispatch(postVerifyWebauthnToken(token));
    }
  }

};

const SecurityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Security);

export default i18n(SecurityContainer);

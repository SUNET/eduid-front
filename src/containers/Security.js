
import { connect } from 'react-redux';
import Security from 'components/Security';
import { confirmPasswordChange, startConfirmationPassword, stopConfirmationPassword,
         confirmDeletion, stopConfirmationDeletion, startConfirmationDeletion,
          startU2fRegistration, stopU2fRegistration, postRemoveU2FToken,
          startAskU2FDescription, stopAskU2FDescription, postVerifyU2FToken} from "actions/Security";
import { eduidRMAllNotify } from "actions/Notifications";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
     credentials: state.security.credentials,
     confirming_change: state.security.confirming_change,
     confirming_deletion: state.security.confirming_deletion,
     is_fetching: state.security.is_fetching,
     redirect_to: state.security.location,
     deleted: state.security.deleted,
     u2f_asking_description: state.security.u2f_asking_description,
     u2f_is_fetching: state.security.u2f_is_fetching,
     u2f_is_enrolled: state.security.u2f_is_enrolled
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
    handleStartAskingU2FDescription: function (e) {
        dispatch(eduidRMAllNotify());
        dispatch(startAskU2FDescription());
    },
    handleStopAskingU2FDescription: function (e) {
        dispatch(stopAskU2FDescription());
    },
    handleStartU2fRegistration: function (e) {
        const description = document.getElementById('describeU2FTokenDialogControl').value;
        dispatch(stopAskU2FDescription());
        dispatch(startU2fRegistration(description));
    },
    handleCloseU2fModal: function (e) {
        dispatch(stopU2fRegistration());
    },
    handleRemoveU2FToken: function (e) {
        const token = e.target.closest('.u2f-token-holder').dataset.token;
        dispatch(postRemoveU2FToken(token));
    },
    handleVerifyU2FToken: function (e) {
        const token = e.target.closest('.u2f-token-holder').dataset.token;
        dispatch(postVerifyU2FToken(token));
    }
  }

};

const SecurityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Security);

export default i18n(SecurityContainer);

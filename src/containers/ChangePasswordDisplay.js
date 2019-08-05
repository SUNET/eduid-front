import { connect } from "react-redux";
import i18n from "i18n-messages";
import {
  confirmPasswordChange,
  startConfirmationPassword,
  stopConfirmationPassword
} from "actions/Security";
import { eduidRMAllNotify } from "actions/Notifications";
import ChangePasswordDisplay from "components/ChangePasswordDisplay";

const mapStateToProps = (state, props) => {
  return {
    confirming_change: state.security.confirming_change
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleStartConfirmationPassword: function(e) {
      dispatch(eduidRMAllNotify());
      dispatch(startConfirmationPassword());
    },
    handleStopConfirmationPassword: function(e) {
      dispatch(stopConfirmationPassword());
    },
    handleConfirmationPassword: function(e) {
      dispatch(confirmPasswordChange());
    }
  };
};

const ChangePasswordDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordDisplay);

export default i18n(ChangePasswordDisplayContainer);

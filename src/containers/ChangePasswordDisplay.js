import { connect } from "react-redux";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import {
  confirmPasswordChange,
  startConfirmationPassword,
  stopConfirmationPassword
} from "actions/Security";
import { eduidRMAllNotify } from "actions/Notifications";
import ChangePasswordDisplay from "components/ChangePasswordDisplay";

const mapStateToProps = (state) => {
  return {
    confirming_change: state.security.confirming_change
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleStartConfirmationPassword: function() {
      dispatch(eduidRMAllNotify());
      dispatch(startConfirmationPassword());
    },
    handleStopConfirmationPassword: function() {
      dispatch(stopConfirmationPassword());
    },
    handleConfirmationPassword: function() {
      dispatch(confirmPasswordChange());
    }
  };
};

const ChangePasswordDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordDisplay);

export default i18n(ChangePasswordDisplayContainer);

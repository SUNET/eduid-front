import { connect } from "react-redux";
import i18n from "i18n-messages";
import {
  confirmDeletion,
  stopConfirmationDeletion,
  startConfirmationDeletion
} from "actions/Security";
import { eduidRMAllNotify } from "actions/Notifications";
import DeleteAccount from "components/DeleteAccount";

const mapStateToProps = (state, props) => {
  return {
    credentials: state.security.credentials,
    confirming_deletion: state.security.confirming_deletion,
    redirect_to: state.security.location,
    deleted: state.security.deleted
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleStartConfirmationDeletion: function (e) {
      dispatch(eduidRMAllNotify());
      dispatch(startConfirmationDeletion());
    },
    handleStopConfirmationDeletion: function (e) {
      dispatch(stopConfirmationDeletion());
    },
    handleConfirmationDeletion: function (e) {
      dispatch(confirmDeletion());
    }
  };
};

const DeleteAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAccount);

export default i18n(DeleteAccountContainer);
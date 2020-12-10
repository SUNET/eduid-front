import { connect } from "react-redux";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import {
  confirmDeletion,
  stopConfirmationDeletion,
  startConfirmationDeletion
} from "actions/Security";
import { eduidRMAllNotify } from "actions/Notifications";
import DeleteAccount from "components/DeleteAccount";

const mapStateToProps = (state) => {
  return {
    credentials: state.security.credentials,
    confirming_deletion: state.security.confirming_deletion,
    redirect_to: state.security.location,
    deleted: state.security.deleted
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleStartConfirmationDeletion: function () {
      dispatch(eduidRMAllNotify());
      dispatch(startConfirmationDeletion());
    },
    handleStopConfirmationDeletion: function () {
      dispatch(stopConfirmationDeletion());
    },
    handleConfirmationDeletion: function () {
      dispatch(confirmDeletion());
    }
  };
};

const DeleteAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAccount);

export default i18n(DeleteAccountContainer);
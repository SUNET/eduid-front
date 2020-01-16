import { connect } from "react-redux";
import PendingActions from "components/PendingActions";
import { eduidRMAllNotify } from "actions/Notifications";
import i18n from "i18n-messages";
import { showModal, closeModal } from "actions/PendingActions";

const mapStateToProps = (state, props) => {
  return {
    dashboard_url: state.config.DASHBOARD_URL,
    pending: state.profile.pending,
    pending_confirm: state.profile.pending_confirm,
    showModal: state.pendingActions.showModal
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleShowModal: function(e) {
      dispatch(eduidRMAllNotify());
      dispatch(showModal());
    },
    handleCloseModal: function(e) {
      dispatch(eduidRMAllNotify());
      dispatch(closeModal());
    },
    handleGoToPending: function(missing) {
      return function(e) {
        e.preventDefault();
        this.props.history.push("/profile/" + missing);
      };
    }
  };
};

const PendingActionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingActions);

export default i18n(PendingActionsContainer);

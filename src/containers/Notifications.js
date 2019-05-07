import { connect } from "react-redux";
import Notifications from "components/Notifications";
import * as actions from "actions/Notifications";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  return {
    debug: state.config.debug,
    messages: state.notifications.messages,
    errors: state.notifications.errors
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleRMNotification(e) {
      e.preventDefault();
      dispatch(actions.eduidRMAllNotify());
    }
  };
};

const NotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

export default i18n(NotificationsContainer);

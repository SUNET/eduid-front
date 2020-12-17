import { connect } from "react-redux";
import Notifications from "./Notifications";
import * as actions from "./Notifications_actions";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  return {
    // debug: state.config.debug,
    messages: state.notifications.messages,
    errors: state.notifications.errors
  };
};

const mapDispatchToProps = (dispatch) => {
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

export default InjectIntl(NotificationsContainer);

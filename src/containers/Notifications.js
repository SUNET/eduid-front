import { connect } from "react-redux";
import Notifications from "components/Notifications";
import * as actions from "reducers/Notifications";

const mapStateToProps = (state) => {
  return {
    debug: state.config.debug,
    info: state.notifications.info,
    error: state.notifications.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleRMNotification(e) {
      e.preventDefault();
      dispatch(actions.clearNotifications());
    },
  };
};

/* This container, being untyped JavaScript, lets us get away with mapping state from either
 * eduID application (login, dashboard, signup, error, ...) to this shared component until we
 * figure out how to do that in a typed fashion.
 */
const NotificationsContainer = connect(mapStateToProps, mapDispatchToProps)(Notifications);

export default NotificationsContainer;

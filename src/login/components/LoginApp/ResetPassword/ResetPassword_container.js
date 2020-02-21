import { connect } from "react-redux";
import * as actions from "./Notifications_actions";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  return {
    // debug: state.config.debug,
    messages: state.notifications.messages,
    errors: state.notifications.errors
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleaction(e) {
      e.preventDefault();
      dispatch(actions.thing());
    }
  };
};

const NotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

export default InjectIntl(NotificationsContainer);

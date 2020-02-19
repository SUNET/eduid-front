import { connect } from "react-redux";
// import * as actions from "./Notifications_actions";
import EmailLinkSent from "./EmailLinkSent";
import i18n from "../../../../../i18n-messages";

const mapStateToProps = (state, props) => {
  return {
    // debug: state.config.debug,
    email: state.login.email
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleaction(e) {
      e.preventDefault();
      // dispatch(actions.thing());
    }
  };
};

const EmailLinkSentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailLinkSent);

export default i18n(EmailLinkSentContainer);

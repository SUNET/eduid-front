import { connect } from "react-redux";
// import * as actions from "./Notifications_actions";
import EmailLinkSent from "./EmailLinkSent";
// import i18n from "../../../../../InjectIntl_HOC_factory";
import InjectIntl from "../../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = () => {
  return {
    // debug: state.config.debug,
    // email: state.login.email
  };
};

const mapDispatchToProps = () => {
  return {
    handleResendLink(e) {
      e.preventDefault();
      console.log("this is resendLink func");
      // dispatch(actions.thing());
    }
  };
};

const EmailLinkSentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailLinkSent);

export default InjectIntl(EmailLinkSentContainer);

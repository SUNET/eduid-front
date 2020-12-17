import { connect } from "react-redux";
import InjectIntl from "../../../../translation/InjectIntl_HOC_factory";
import { withRouter } from "react-router-dom";
import UseConfirmationCode from "./UseConfirmationCode";
// import * as actions from "./GetEmailLink_actions";

const mapStateToProps = () => {
  return {
    // email: state.getEmailLink.email,
    // enableReinitialize: true
  };
};

const mapDispatchToProps = (props) => {
  return {
    handleUseConfirmationCode: e => {
      console.log("you're in handleResendConfirmationCode");
      e.preventDefault();
      props.history.push("/reset/reset-password/set-new-password/");
    },
    handleResendConfirmationCode: e => {
      console.log("you're in handleResendConfirmationCode");
      e.preventDefault();
      // props.history.push("/reset/reset-password/set-new-password/");
    }
  };
};

const UseConfirmationCodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UseConfirmationCode);

// export default InjectIntl(GetEmailLinkContainer);
export default InjectIntl(withRouter(UseConfirmationCodeContainer));

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../../translation/InjectIntl_HOC_factory";
import SetNewPassword from "./SetNewPassword";

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (props) => {
  return {
    handleGetConfirmCode(e) {
      e.preventDefault();
      console.log("this is confirm code func");
      props.history.push("/reset/reset-password/use-confirmation-code");
      // dispatch(actions.thing());
    }
  };
};

const SetNewPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SetNewPassword);

// export default InjectIntl(GetConfirmationCodeContainer);

export default InjectIntl(withRouter(SetNewPasswordContainer));
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../../translation/InjectIntl_HOC_factory";
import GetConfirmationCode from "./GetConfirmationCode";

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleSendConfirmCode(e) {
      e.preventDefault();
      console.log("this is confirm code func");
      props.history.push("/reset/reset-password/use-confirmation-code");
      // dispatch(actions.thing());
    }
  };
};

const GetConfirmationCodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetConfirmationCode);

// export default InjectIntl(GetConfirmationCodeContainer);

export default InjectIntl(withRouter(GetConfirmationCodeContainer));
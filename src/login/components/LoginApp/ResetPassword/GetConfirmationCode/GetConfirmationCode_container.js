import { connect } from "react-redux";
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
      // dispatch(actions.thing());
    }
  };
};

const GetConfirmationCodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetConfirmationCode);

export default InjectIntl(GetConfirmationCodeContainer);

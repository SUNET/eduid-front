import { connect } from "react-redux";

import i18n from "../login/translation/InjectIntl_HOC_factory";
import ResendCode from "components/ResendCode";
import * as actions from "actions/ResendCode";

const mapStateToProps = (state, props) => {
  return {
    email: state.email.email
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleResend: e => {
      dispatch(actions.postResendCode());
    }
  };
};

const ResendCodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResendCode);

export default i18n(ResendCodeContainer);

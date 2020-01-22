import { connect } from "react-redux";
import i18n from "i18n-messages";

import ResetpwCode from "login/ResetpwCode/ResetpwCode";
import * as actions from "login/ResetpwCode/ResetpwCode_actions";

const mapStateToProps = (state, props) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  };
};

const ResetpwCodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetpwCode);

export default i18n(ResetpwCodeContainer);

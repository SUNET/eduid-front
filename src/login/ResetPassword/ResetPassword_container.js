import { connect } from "react-redux";
import i18n from "i18n-messages";

import ResetPassword from "login/ResetPassword/ResetPassword";

const mapStateToProps = (state, props) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  };
};

const ResetPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);

export default i18n(ResetPasswordContainer);

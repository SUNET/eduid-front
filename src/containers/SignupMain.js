import { connect } from "react-redux";

import i18n from "../login/translation/InjectIntl_HOC_factory";
import SignupMain from "components/SignupMain";

const mapStateToProps = (state) => {
  return {
    code: state.config.code,
    email: state.email.email,
    captcha: state.config.captcha
  };
};

const SignupMainContainer = connect(mapStateToProps)(SignupMain);

export default i18n(SignupMainContainer);

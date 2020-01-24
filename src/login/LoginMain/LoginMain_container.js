import { connect } from "react-redux";

import i18n from "i18n-messages";
import LoginMain from "login/LoginMain/LoginMain";


const mapStateToProps = (state, props) => {
  return {
    //is_fetching: state.config.is_fetching,
  };
};

const LoginMainContainer = connect(
  mapStateToProps,
)(LoginMain);

export default i18n(LoginMainContainer);

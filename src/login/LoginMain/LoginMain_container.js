import { connect } from "react-redux";

import i18n from "i18n-messages";
import LoginMain from "login/LoginMain/LoginMain";
import * as actions from "login/LoginMain/LoginMain_actions";

const mapStateToProps = (state, props) => {
  return {
    resize_timeout: state.app.resize_timeout,
    is_fetching: state.app.is_fetching,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleWindowSizeChange(e) {
      if (this.props.resize_timeout !== 0) {
        window.clearTimeout(this.props.resize_timeout);
      }
      const resize_timeout = window.setTimeout(function() {
        dispatch(actions.resizeWindow());
        dispatch(actions.resizeTimeout(0));
      }, 1000);
      dispatch(actions.resizeTimeout(resize_timeout));
    }
  };
};

const LoginMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginMain);

export default i18n(LoginMainContainer);

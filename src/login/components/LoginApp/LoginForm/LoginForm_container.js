import { connect } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

import LoginForm from "./LoginForm";
import * as actions from "./LoginForm_actions";

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    enableReinitialize: true
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: e => {
      e.preventDefault();
      const addedEmail = e.target.closest(".form").children[0].children[1]
        .value;
      if (addedEmail) {
        // login-rootSaga.js: make this trigger postLoginDetails()
        dispatch(actions.addLoginDetails(addedEmail));
      }
    }
  };
};

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default InjectIntl(LoginFormContainer);

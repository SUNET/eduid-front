import { connect } from "react-redux";
import i18n from "../../../i18n-messages";

import LoginForm from "./LoginForm";
import * as actions from "./LoginForm_actions";

const mapStateToProps = (state, props) => {
  return {
    email: state.login.email,
    enableReinitialize: true
    // buttonDisabled: state.login.valid
    // buttonDisabled: state.login.buttonDisabled
    //is_fetching: state.config.is_fetching,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleLogin: e => {
      e.preventDefault();
      console.log("your are in container handleLogin");
      const addedEmail = e.target.closest(".form").children[0].children[1]
        .value;
      console.log("this is addedEmail ", addedEmail);
      if (addedEmail) {
        dispatch(actions.addEmail(addedEmail));
      }
    }
  };
};

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default i18n(LoginFormContainer);

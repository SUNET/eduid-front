import { connect } from "react-redux";
import i18n from "../../../i18n-messages";
import LoginForm from "./LoginForm";
import * as actions from "./LoginForm_actions";
// import { emailValidation } from "../../app_utils/validation";

const mapStateToProps = (state, props) => {
  return {
    // email: state.login.email,
    enableReinitialize: true
    //is_fetching: state.config.is_fetching,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleLogin: e => {
      console.log("your are in container handleLogin");
      e.preventDefault();
      // const addedEmail = e.target.closest(".form").children[0].children[1]
      //   .value;
      // console.log("this is addedEmail ", addedEmail);
      // if (addedEmail) {
      //   dispatch(actions.saveEmailFail(addedEmail));
      // }
    }
  };
};

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default i18n(LoginFormContainer);

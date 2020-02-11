import { connect } from "react-redux";
import i18n from "../../../i18n-messages";
import LoginForm from "./LoginForm";

import * as actions from "./LoginForm_actions";
// import { emailValidation } from "../../app_utils/validation";

const mapStateToProps = (state, props) => {
  return {
    // email: state.login.email
    //is_fetching: state.config.is_fetching,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // handleValidation: e => {
    //   e.preventDefault();
    //   // get result from validation
    //   const email = emailValidation(e);
    //   console.log("this is valid email", email);
    //   // dispatch(actions.validate());
    //   if (email.valid) {
    //     dispatch(actions.addEmail(email.input));
    //   }
    // },
    handleSubmit: e => {
      console.log("your are in container handleSubmit");
      e.preventDefault();
      const addedEmail = e.target.closest(".form").children[0].children[1]
        .value;
      console.log("this is addedEmail ", addedEmail);
      if (addedEmail) {
        dispatch(actions.saveEmailFail(addedEmail));
      }
    }
  };
};

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default i18n(LoginFormContainer);

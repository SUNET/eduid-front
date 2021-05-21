import { connect } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

import LoginForm from "./LoginForm";
import { addLoginEmail } from "../../../redux/actions/addDataToStoreActions";

const mapStateToProps = (state) => {
  let loginEmail = {};
  if (state.form.loginForm !== undefined) {
    loginEmail = state.form.loginForm.email;
  }
  return {
    email: loginEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddEmail: () => {
      const email = document.getElementsByTagName("input")[0].value;
      dispatch(addLoginEmail(email));
    },
  };
};

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default InjectIntl(LoginFormContainer);

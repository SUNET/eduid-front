import { connect } from "react-redux";
import i18n from "i18n-messages";

import InitResetForm from "login/InitResetForm/InitResetForm";
import * as actions from "login/InitResetForm/InitResetForm_actions";


const mapStateToProps = (state, props) => {
  return {
    email_sent: state.reset.email_sent,
    enableReinitialize: true,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleEmail: (e) => {
      e.preventDefault();
      const email = document.querySelector("#init-reset-form input[name='email']").value;
      dispatch(actions.dealWithEmail(email));
    },
  };
};

const InitResetFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InitResetForm);

export default i18n(InitResetFormContainer);

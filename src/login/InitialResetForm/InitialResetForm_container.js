import { connect } from "react-redux";
import InitForm from "login/InitialResetForm/InitialResetForm";
import * as actions from "login/InitialResetForm/InitialResetForm_actions";
import i18n from "i18n-messages";


const mapStateToProps = (state, props) => {
  return {
    enableReinitialize: true
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

const InitFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InitForm);

export default i18n(InitFormContainer);

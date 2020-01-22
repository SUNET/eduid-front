import { connect } from "react-redux";
import CodeForm from "login/ResetpwCodeForm/ResetpwCodeForm";
import * as actions from "login/ResetpwCodeForm/ResetpwCodeForm_actions";
import i18n from "i18n-messages";


const mapStateToProps = (state, props) => {
  return {
    enableReinitialize: true
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  };
};

const CodeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeForm);

export default i18n(CodeFormContainer);

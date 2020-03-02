import { connect } from "react-redux";
import i18n from "i18n-messages";

import { history } from "login/LoginMain/LoginMain";
import Resetting from "login/Resetting/Resetting";
import * as actions from "login/Resetting/Resetting_actions";


const mapStateToProps = (state, props) => {
  return {
    alternatives: state.config.extra_security,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handlePhoneNumber: (index) => {
      // Handler for clicking on buttons offering to reset the password
      // with extra security provided by verified phone numbers.
      return (e) => {
        e.preventDefault();
        dispatch(actions.chooseExtraSecurityPhone(index));
      }
    },
    handleToken: () => {
      // Handler for clicking on buttons offering to reset the password
      // with extra security provided by fido tokens.
      return (e) => {
        e.preventDefault();
        dispatch(actions.chooseExtraSecurityToken());
        history.push('/reset-password/choose/');
      }
    },
    handleNoExtraSec: (e) => {
      // Handler for clicking on the button offering to reset the password
      // with no extra security.
      e.preventDefault();
      dispatch(actions.chooseExtraSecurityNone());
      history.push('/reset-password/choose/');
    },
  };
};

const ResettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Resetting);

export default i18n(ResettingContainer);

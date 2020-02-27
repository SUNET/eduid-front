import { connect } from "react-redux";
// import i18n from "InjectIntl_HOC_factory";
import { connect } from "react-redux";
import { history } from "login/LoginMain/LoginMain";
import Resetting from "login/Resetting/Resetting";
import * as actions from "login/Resetting/Resetting_actions";
// import Resetting from "login/Resetting/Resetting";


const mapStateToProps = (state, props) => {
  return {
    alternatives: state.config.extra_security,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handlePhoneNumber: (index) => {
      return (e) => {
        e.preventDefault();
        dispatch(actions.chooseExtraSecurityPhone(index));
      }
    },
    handleToken: () => {
      return (e) => {
        e.preventDefault();
        dispatch(actions.chooseExtraSecurityToken());
        history.push('/reset-password/choose/');
      }
    },
    handleNoExtraSec: (e) => {
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

export default InjectIntl(ResettingContainer);

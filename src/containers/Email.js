import * as actions from "actions/Email";
import { history } from "components/SignupMain";
import { connect } from "react-redux";
import { clearNotifications } from "reducers/Notifications";
import { SIGNUP_BASE_PATH } from "../globals";
import RegisterEmail from "../login/components/RegisterEmail/RegisterEmail";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  const lang = state.intl.locale;
  let tou = "";
  if (state.config.tous !== undefined) {
    tou = state.config.tous[lang];
  }
  return {
    dashboard_url: state.config.dashboard_url,
    acceptingTOU: state.email.acceptingTOU,
    tou: tou,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAccept: (e) => {
      e.preventDefault();
      dispatch(actions.acceptTOU());
      history.push(SIGNUP_BASE_PATH + "/trycaptcha");
      // remove any remaining notification messages
      dispatch(clearNotifications());
      // to make captcha button active
      //dispatch(makeCapthaButtonAvailable());
    },
    handleReject: (e) => {
      e.preventDefault();
      dispatch(actions.rejectTOU());
    },
    gotoSignup: function (e) {
      e.preventDefault();
      document.location.href = "/";
    },
    gotoSignin: function (e) {
      e.preventDefault();
      const dataNode = e.target.closest("div"),
        url = dataNode.dataset.dashboard_url;
      document.location.href = url;
    },
  };
};

const EmailContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterEmail);

export default i18n(EmailContainer);

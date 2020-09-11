import { connect } from "react-redux";
import RegisterEmail from "./RegisterEmail";
import * as actions from "../../redux/actions/registerEmailActions";
import i18n from "../../translation/InjectIntl_HOC_factory";
import { history } from "../../../components/SignupMain";

const mapStateToProps = (state, props) => {
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

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleEmail: function (e) {
      e.preventDefault();
      const email = document.querySelector("input[name='email']").value;
      dispatch(actions.addEmail(email));
    },
    handleAccept: (e) => {
      e.preventDefault();
      dispatch(actions.acceptTOU());
      history.push(BASE_PATH + "/trycaptcha");
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

const RegisterEmailContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterEmail);

export default i18n(RegisterEmailContainer);

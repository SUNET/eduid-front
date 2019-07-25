import { connect } from "react-redux";
import Email from "components/Email";
import * as actions from "actions/Email";
import i18n from "i18n-messages";
import { history } from "components/SignupMain";

const mapStateToProps = (state, props) => {
  const lang = state.intl.locale;
  let tou = "";
  if (state.config.tous !== undefined) {
    tou = state.config.tous[lang];
  }
  return {
    dashboard_url: state.config.dashboard_url,
    size: state.config.window_size,
    acceptingTOU: state.email.acceptingTOU,
    tou: tou
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleEmail: function(e) {
      e.preventDefault();
      const email = e.target.closest("#content").children[1].children[1]
        .firstChild.firstChild.children[0].value;
      console.log("this is email:", email);
      dispatch(actions.addEmail(email));
    },
    handleAccept: e => {
      e.preventDefault();
      dispatch(actions.acceptTOU());
      history.push(BASE_PATH + "/trycaptcha");
    },
    handleReject: e => {
      e.preventDefault();
      dispatch(actions.rejectTOU());
    },
    gotoSignup: function(e) {
      e.preventDefault();
      document.location.href = "/";
    },
    gotoSignin: function(e) {
      e.preventDefault();
      const dataNode = e.target.closest("div"),
        url = dataNode.dataset.dashboard_url;
      document.location.href = url;
    }
  };
};

const EmailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Email);

export default i18n(EmailContainer);

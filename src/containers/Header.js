import { connect } from "react-redux";
import Header from "components/Header";
import { startLogout } from "actions/Header";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  let email, confirmed;
  // if (state.emails.emails.length >= 1) {
  //   email = state.emails.emails.filter(mail => mail.primary)[0].email;
  // } else {
  //   email = "";
  // }
  // const nins = state.nins.nins.filter(nin => nin.verified);
  // if (nins.length >= 1) {
  //   confirmed = "main.confirmed";
  // } else {
  //   confirmed = "main.unconfirmed";
  // }


  return {
    dashboard_url: state.config.dashboard_url,
    // students_link: state.config.students_link,
    // technicians_link: state.config.technicians_link,
    // staff_link: state.config.staff_link,
    // faq_link: state.config.faq_link,
    // email: email,
    confirmed: confirmed,
    // studentsLink: state.config.STATIC_STUDENTS_URL,
    // techniciansLink: state.config.STATIC_TECHNICIANS_URL,
    // staffLink: state.config.STATIC_STAFF_URL,
    // faqLink: state.config.STATIC_FAQ_URL,
    // size: state.config.window_size
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleLogout: function(e) {
      dispatch(startLogout());
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
    }
  };
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default i18n(HeaderContainer);


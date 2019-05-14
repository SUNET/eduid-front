import { connect } from "react-redux";

import i18n from "i18n-messages";
import Main from "components/DashboardMain";
import { resizeWindow } from "actions/DashboardConfig";

const mapStateToProps = (state, props) => {
  let email, confirmed;
  if (state.emails.emails.length >= 1) {
    email = state.emails.emails.filter(mail => mail.primary)[0].email;
  } else {
    email = "";
  }
  return {
    email: email,
    window_size: state.config.window_size,
    show_sidebar: state.config.show_sidebar,
    eppn: state.personal_data.data.eppn
  };
};

// const mapStateToProps = (state, props) => {
//   let email, confirmed;
//   if (state.emails.emails.length >= 1) {
//     email = state.emails.emails.filter(mail => mail.primary)[0].email;
//   } else {
//     email = "";
//   }
//   // const nins = state.nins.nins.filter(nin => nin.verified);
//   // if (nins.length >= 1) {
//   //   confirmed = "main.confirmed";
//   // } else {
//   //   confirmed = "main.unconfirmed";
//   // }
//   return {
//     email: email,
//     // confirmed: confirmed,
//     // studentsLink: state.config.STATIC_STUDENTS_URL,
//     // techniciansLink: state.config.STATIC_TECHNICIANS_URL,
//     // staffLink: state.config.STATIC_STAFF_URL,
//     // faqLink: state.config.STATIC_FAQ_URL,
//     // size: state.config.window_size
//   };
// };

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     handleLogout: function (e) {
//       dispatch(startLogout());
//     }
//   };
// };

// const HeaderContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Header);

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleWindowSizeChange(e) {
      dispatch(resizeWindow());
    }
  };
};

const DashboardMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default i18n(DashboardMainContainer);

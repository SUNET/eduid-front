import { connect } from "react-redux";

import i18n from "i18n-messages";
import Main from "components/DashboardMain";
// import { resizeWindow } from "actions/DashboardConfig";

// const mapStateToProps = (state, props) => {
//   let email, confirmed;
//   if (state.emails.emails.length >= 1) {
//     email = state.emails.emails.filter(mail => mail.primary)[0].email;
//   } else {
//     email = "";
//   }
//   return {
//     email: email,
//     nins: state.nins.nins,
//     // window_size: state.config.window_size,
//     // show_sidebar: state.config.show_sidebar,
//     eppn: state.personal_data.data.eppn
//   };
// };

const mapStateToProps = (state, props) => {
  let email, confirmed;
  if (state.emails.emails.length >= 1) {
    email = state.emails.emails.filter(mail => mail.primary)[0].email;
  } else {
    email = "";
  }
  const nins = state.nins.nins.filter(nin => nin.verified);
  if (nins.length >= 1) {
    confirmed = "main.confirmed";
  } else {
    confirmed = "main.unconfirmed";
  }
  return {
    email: email,   // email for heading 
    nins: nins,     // nin to see where to prompt user
    eppn: state.personal_data.data.eppn, // this should go to SETTINGS
    confirmed: confirmed // could be a boolean? to show what colour to display nin
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleWindowSizeChange: function(e) {
      console.log("hello! you are in handleWindowSizeChange") 
    }
  };
};

const DashboardMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default i18n(DashboardMainContainer);

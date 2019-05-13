import { connect } from "react-redux";

import i18n from "i18n-messages";
import Main from "components/DashboardMain";
import { resizeWindow } from "actions/DashboardConfig";

const mapStateToProps = (state, props) => {
  let email;
  if (state.emails.emails.length >= 1) {
    email = state.emails.emails.filter(mail => mail.primary)[0].email;
  } else {
    email = "";
  }
  return {
    email: email,
    eppn: state.personal_data.data.eppn
  };
};

const DashboardMainContainer = connect(
  mapStateToProps
)(Main);

export default i18n(DashboardMainContainer);

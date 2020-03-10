import { connect } from "react-redux";
import { isValid } from "redux-form";
import * as actions from "actions/Nins";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import Main from "components/DashboardMain";


const mapStateToProps = (state, props) => {
  let email, verifiedNin;
  if (state.emails.emails.length >= 1) {
    email = state.emails.emails.filter(mail => mail.primary)[0].email;
  } else {
    email = "";
  }
  const nins = state.nins.nins.filter(nin => nin.verified);
  if (nins.length >= 1) {
    verifiedNin = true;
  } else {
    verifiedNin = false;
  }
  return {
    email: email, // email for heading
    nin: state.nins.nin, // nin to see where to prompt user
    // eppn: state.personal_data.data.eppn,
    verifiedNin: verifiedNin
  };
};

const DashboardMainContainer = connect(
  mapStateToProps
)(Main);

export default i18n(DashboardMainContainer);

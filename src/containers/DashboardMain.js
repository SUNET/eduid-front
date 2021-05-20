import { connect } from "react-redux";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import Main from "components/DashboardMain";
import { checkCookieStatus } from "../login/redux/actions/addDataToStoreActions";

const mapStateToProps = (state) => {
  let email, verifiedNin;
  if (state.emails.emails.length >= 1) {
    email = state.emails.emails.filter((mail) => mail.primary)[0].email;
  } else {
    email = "";
  }
  const nins = state.nins.nins.filter((nin) => nin.verified);
  if (nins.length >= 1) {
    verifiedNin = true;
  } else {
    verifiedNin = false;
  }
  return {
    email: email, 
    nin: state.nins.nin, 
    verifiedNin: verifiedNin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCheckCookieStatus: (status) => {
      dispatch(checkCookieStatus(status));
    },
  };
};

const DashboardMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default i18n(DashboardMainContainer);

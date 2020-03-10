import PropTypes from "prop-types";
import { connect } from "react-redux";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import Profile from "components/Profile";

const mapStateToProps = (state, props) => {
  let verifiedNinStatus = "";
  let verifiedPhone = "";
  const nins = state.nins.nins.filter(nin => nin.verified);
  nins.length >= 1 ? (verifiedNinStatus = true) : (verifiedNinStatus = false);
  const phones = state.phones.phones.filter(phoneNum => phoneNum.verified);
  phones.length >= 1 ? (verifiedPhone = true) : (verifiedPhone = false);

  return {
    nins: state.nins.nins, // all nin info
    verifiedNin: nins, // all verified nin info
    verifiedNinStatus: verifiedNinStatus, // is the added nin verified?
    phones: state.phones.phones, // all phone info
    verifiedPhone: verifiedPhone,
    firstName: state.personal_data.data.given_name,
    lastName: state.personal_data.data.surname,
    message: state.nins.message
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default i18n(ProfileContainer);

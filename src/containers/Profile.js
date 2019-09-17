import PropTypes from "prop-types";
import { connect } from "react-redux";
import i18n from "i18n-messages";
import Profile from "components/Profile";

const mapStateToProps = (state, props) => {
  let verifiedNinStatus = "";
  let verifiedPhone = "";
  const nins = state.nins.nins.filter(nin => nin.verified);
  nins.length >= 1 ? (verifiedNinStatus = true) : (verifiedNinStatus = false);
  // if (nins.length >= 1) {
  //   verifiedNinStatus = true;
  // } else {
  //   verifiedNinStatus = false;
  // }
  const phones = state.phones.phones.filter(phoneNum => phoneNum.verified);
  phones.length >= 1 ? (verifiedPhone = true) : (verifiedPhone = false);
  // if (phones.length >= 1) {
  //   verifiedPhone = true;
  // } else {
  //   verifiedPhone = false;
  // }
  // const phoneNumber = state.phones.phones.filter(phone => phone.primary);
  const emailAddress = state.emails.emails.filter(email => email.primary);
  return {
    nins: state.nins.nins, // all nin info
    verifiedNin: nins, // all verified nin info
    verifiedNinStatus: verifiedNinStatus, // is the added nin verified?
    phones: state.phones.phones, // all phone info
    verifiedPhone: verifiedPhone,
    emails: emailAddress, // all info about primary email
    firstName: state.personal_data.data.given_name,
    lastName: state.personal_data.data.surname,
    // valid_nin: isValid("nins")(state),
    message: state.nins.message
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default i18n(ProfileContainer);

import { connect } from "react-redux";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import Profile from "components/Profile";

const mapStateToProps = (state) => {
  const nins = state.nins.nins.filter((nin) => nin.verified);
  const phones = state.phones.phones.filter((phoneNum) => phoneNum.verified);

  const verifiedNinStatus = nins.length >= 1;
  const verifiedPhone = phones.length >= 1;

  return {
    nins: state.nins.nins, // all nin info
    verifiedNin: nins, // all verified nin info
    verifiedNinStatus: verifiedNinStatus, // is the added nin verified?
    phones: state.phones.phones, // all phone info
    verifiedPhone: verifiedPhone,
    firstName: state.personal_data.data.given_name,
    lastName: state.personal_data.data.surname,
    message: state.nins.message,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default i18n(ProfileContainer);

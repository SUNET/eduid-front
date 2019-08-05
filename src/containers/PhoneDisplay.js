import { connect } from "react-redux";
import PhoneDisplay from "components/PhoneDisplay";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  let primaryPhoneStatus = "";
  const primaryPhone = state.phones.phones.filter(phone => phone.primary);
  primaryPhone.length === 1
    ? (primaryPhoneStatus = true)
    : (primaryPhoneStatus = false);
  return {
    phones: state.phones.phones,
    primaryPhone,
    primaryPhoneStatus
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const PhoneDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneDisplay);

export default i18n(PhoneDisplayContainer);
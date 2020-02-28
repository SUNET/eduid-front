import { connect } from "react-redux";
import PhoneNumDisplay from "./PhoneNumDisplay";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  let primaryPhoneStatus = "";
  // return {};
  // const primaryPhone = state.phones.phones.filter(phone => phone.primary);
  // console.log("this is this state.phones.phones in PhoneDisplay_container",state.phones.phones)
  // primaryPhone.length === 1
  //   ? (primaryPhoneStatus = true)
  //   : (primaryPhoneStatus = false);
  console.log("this is extra security object", state.config.extra_security);

  return {
    //   phones: state.phones.phones,
    primaryPhone: ["079XXXXX97"],
    primaryPhoneStatus: true
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const PhoneNumDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNumDisplay);

export default InjectIntl(PhoneNumDisplayContainer);

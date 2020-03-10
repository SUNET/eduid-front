import { connect } from "react-redux";
import ResetPassword from "./ResetPassword";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  let primaryPhoneStatus = "";
  // return {};
  // const primaryPhone = state.phones.phones.filter(phone => phone.primary);
  // console.log("this is this state.phones.phones in PhoneDisplay_container",state.phones.phones)
  // primaryPhone.length === 1
  //   ? (primaryPhoneStatus = true)
  //   : (primaryPhoneStatus = false);
  console.log("this is state.config", state.config);
  console.log("this is extra security object", state.config.extra_security);
  console.log(
    "this is state.config.extra_security.phone_numbers",
    state.config.extra_security.phone_numbers
  );
  console.log(
    "this is state.config.extra_security.tokens",
    state.config.extra_security.tokens
  );
  // console.log(
  //   "this is state.config.extra_security.tokens",
  //   state.config.alt.index
  // );

  return {
    // phone_numbers: state.config.extra_security.phone_numbers,
    // security_keys: state.config.extra_security.tokens
    phone_numbers: [7091234567, 7061234567],
    security_keys: {
      u2fdata: "{}",
      webauthn_options:
        "oWlwdWJsaWNLZXmlZHJwSWRsZWR1aWQuZG9ja2VyZ3RpbWVvdXQZdTBpY2hhbGxlbmdlWCDtkiDVpRVH3mVNgTfN4B-yqt2hgMKaYYX-m_KHlzRXtHBhbGxvd0NyZWRlbnRpYWxzgHB1c2VyVmVyaWZpY2F0aW9uaXByZWZlcnJlZA"
    }
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const ResetPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);

export default InjectIntl(ResetPasswordContainer);

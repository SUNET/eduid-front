import React, { useEffect, useState }  from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useHistory } from 'react-router-dom';
import EduIDButton from "../../../../components/EduIDButton";
import { useDispatch, useSelector } from "react-redux";
import ResetPasswordLayout from "./ResetPasswordLayout";
import PropTypes from "prop-types";
import { requestPhoneCode, selectExtraSecurity } from "../../../redux/actions/postResetPasswordActions";
import ExtraSecurityToken from "../ResetPassword/ExtraSecurityToken";
import { assertionFromAuthenticator } from "../../../app_utils/helperFunctions/authenticatorAssertion";

const SecurityKeyButton = ({ 
  selected_option,
  extraSecurityKey, 
  translate, 
  ShowSecurityKey
}) => {
  return (
    !selected_option ? 
     Object.values(extraSecurityKey).map((security) => {
      return (
        <EduIDButton
          className={"settings-button"} 
          id="extra-security"
          key={security}
          onClick={ShowSecurityKey}
        >
        {translate("resetpw.use_extra_security_key")}
        </EduIDButton>
      )
    } 
  ) : selected_option === "securityKey" ? <ExtraSecurityToken /> : null
)};

const SecurityWithSMSButton = ({ extraSecurityPhone, translate, dispatch }) => {
  const sendConfirmCode = (phone)=>{
    dispatch(requestPhoneCode(phone));
  };

  return (
    extraSecurityPhone.map(phone => {
      return (
        <div key={phone.index}>
          <EduIDButton
            className={"settings-button"}
            id="extra-security" 
            key={phone.index}
            onClick={()=>sendConfirmCode(phone)}
          > 
          {translate("resetpw.extra-phone_send_sms")(
            {phone: phone.number.replace(/^.{10}/g, '**********')})}
          </EduIDButton>
        </div>
      )
    })
  )
};

function ExtraSecurity(props){
  const history = useHistory();
  const dispatch = useDispatch();
  const [extraSecurity, setExtraSecurity] = useState(null);
  const loginRef = useSelector(state => state.login.ref);
  const selected_option = useSelector(state => state.resetPassword.selected_option);
  const extra_security = useSelector(
    (state) => state.resetPassword.extra_security
  );
  
  // useEffect(()=>{
  //   if(history.location.state !== undefined){
  //     setExtraSecurity(history.location.state.extra_security)
  //   }else history.push(`/reset-password/email/${loginRef}`)
  // },[extraSecurity, extra_security]);

  const ShowSecurityKey = (e) => {
    e.preventDefault();
    dispatch(selectExtraSecurity("securityKey"));
    startTokenAssertion();
  };

  const startTokenAssertion = () => {
    const webauthn_challenge = extra_security.tokens.webauthn_options;
    if(extra_security.tokens.webauthn_options){
      assertionFromAuthenticator(webauthn_challenge, dispatch);
    }
  };

  return (
    <ResetPasswordLayout
      heading={props.translate("resetpw.extra-security_heading")} 
      description={props.translate("resetpw.extra-security_description")} 
      linkInfoText={props.translate("resetpw.without_extra_security")}
      linkText={props.translate("resetpw.continue_reset_password")}
    > 
      { extraSecurity && extraSecurity.tokens && Object.keys(extraSecurity.tokens).length > 0  ?
        <SecurityKeyButton
          selected_option={selected_option} 
          ShowSecurityKey={ShowSecurityKey} 
          extraSecurityKey={Object.keys(extraSecurity.tokens)} 
          translate={props.translate}
        /> : null
      }
      { !selected_option && extraSecurity && extraSecurity.phone_numbers.length > 0 ? 
        <SecurityWithSMSButton 
          extraSecurityPhone={extraSecurity.phone_numbers} 
          translate={props.translate}
          dispatch={dispatch}
        /> : null
      }
    </ResetPasswordLayout>
  ) 
}

ExtraSecurity.propTypes = {
  history: PropTypes.object,
  location: PropTypes.shape({ pathname: PropTypes.string }),
  translate: PropTypes.func.isRequired,
};

export default InjectIntl(ExtraSecurity);
import React, { useEffect, useState }  from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useHistory } from 'react-router-dom';
import EduIDButton from "../../../../components/EduIDButton";
import { useDispatch, useSelector } from "react-redux";
import ResetPasswordLayout from "./ResetPasswordLayout";
import PropTypes from "prop-types";
import { requestPhoneCode, selectExtraSecurity, selectedPhoneInfo } from "../../../redux/actions/postResetPasswordActions";
import ExtraSecurityToken from "../ResetPassword/ExtraSecurityToken";
import { assertionFromAuthenticator } from "../../../app_utils/helperFunctions/authenticatorAssertion";
import Splash from "../../../../containers/Splash";
import { eduidRMAllNotify } from "../../../../actions/Notifications";

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

const SecurityWithSMSButton = ({ extraSecurityPhone, translate, dispatch, history, emailCode }) => {
  const sendConfirmCode = (phone)=>{
    dispatch(requestPhoneCode(phone));
  };

  const toPhoneCodeForm = (phone)=>{
    dispatch(selectedPhoneInfo(phone));
    dispatch(eduidRMAllNotify());
    history.push(`/reset-password/phone-code-sent/${emailCode}`);
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
          <p className="enter-phone-code">{translate("resetpw.received-sms")} 
            <a onClick={()=>toPhoneCodeForm(phone)}>{translate("resetpw.enter-code")} </a> 
          </p>
        </div>
      )
    })
  )
};

function ExtraSecurity(props){
  const history = useHistory();
  const dispatch = useDispatch();
  const [extraSecurity, setExtraSecurity] = useState(null);
  const selected_option = useSelector(state => state.resetPassword.selected_option);
  const extra_security = useSelector(
    (state) => state.resetPassword.extra_security
  );
  const emailCode = useSelector(state => state.resetPassword.email_code);
  
  useEffect(()=>{
    if(extra_security !== undefined){
      if(Object.keys(extra_security).length > 0){
        setExtraSecurity(extra_security);
      }if(!Object.keys(extra_security).length){
        history.push(`/reset-password/set-new-password/${emailCode}`)
      }
    }
  },[extra_security]);

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
      emailCode={emailCode}
    > 
      {!extraSecurity && <Splash /> }
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
          history={history}
          emailCode={emailCode}
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
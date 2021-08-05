import React, { useEffect, useState }  from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useHistory } from 'react-router-dom';
import EduIDButton from "../../../../components/EduIDButton";
import { useDispatch, useSelector } from "react-redux";
import { requestPhoneCode } from "../../../redux/actions/postResetPasswordActions";

const SecurityKeyButton = ({extraSecurityKey, translate}) => {
  return (
     Object.values(extraSecurityKey).map((security) => {
      return (
        <EduIDButton
          className={"settings-button"} 
          id="extra-security"
          key={security}
        >
        {translate("resetpw.use_extra_security_key")}
        </EduIDButton>
      )
    })
  )
};

const SecurityWithSMSButton = ({extraSecurityPhone, translate }) => {
  const dispatch = useDispatch();

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
  const [extraSecurity, setExtraSecurity] = useState(null);
  const ref = useSelector(state => state.login.ref);

  useEffect(()=>{
    if(history.location.state !== undefined){
      setExtraSecurity(history.location.state.extra_security)
    }else history.push(`/reset-password/email/${ref}`)
  },[extraSecurity]);

  return (
    <>
      <p className="heading">{props.translate("resetpw.extra-security_heading")}</p>
      <div id="reset-pass-display">
        <p>{props.translate("resetpw.extra-security_description")}</p>
        { extraSecurity && extraSecurity.tokens && Object.keys(extraSecurity.tokens).length > 0  ?
          <SecurityKeyButton extraSecurityKey={Object.keys(extraSecurity.tokens)} translate={props.translate} /> : null
        }
        { extraSecurity && extraSecurity.phone_numbers.length > 0 ? 
          <SecurityWithSMSButton extraSecurityPhone={extraSecurity.phone_numbers} translate={props.translate}/> : null
        }
        <p className="decription-without-security">{props.translate("resetpw.without_extra_security")}
          <a href={`/reset-password/set-new-password/`}> {props.translate("resetpw.continue_reset_password")}</a> 
        </p>
      </div>
    </>
  ) 
}

ExtraSecurity.propTypes = {
};

export default InjectIntl(ExtraSecurity);
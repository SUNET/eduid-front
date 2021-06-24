import React, { useEffect, useState, Fragment }  from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useHistory } from 'react-router-dom';
import EduIDButton from "../../../../components/EduIDButton";
import { useDispatch, useSelector } from 'react-redux';
import { isShowSecurityKey } from "../../../redux/actions/postResetPasswordActions";
import SecurityKey from "./SecurityKey";

const SecurityKeyButton = ({extraSecurityKey, translate, ShowSecurityKey}) => {
  return (
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
    })
  )
};

const SecurityWithSMSButton = ({extraSecurityPhone, translate}) => {
  return (
    extraSecurityPhone.map(phone => {
      return (
        <Fragment key={phone.index}>
          <br/>
          <EduIDButton
            className={"settings-button"}
            id="extra-security" 
            key={phone.index}
          > 
          {translate("resetpw.extra-phone_send_sms")(
            {phone: phone.number.replace(/^.{10}/g, '**********')})}
          </EduIDButton>
        </Fragment>
      )
    })
  )
};

function ExtraSecurity(props){
  const history = useHistory();
  const [extraSecurity, setExtraSecurity] = useState();
  const dispatch = useDispatch();
  const show_security_key = useSelector(state => state.resetPassword.show_security_key);

  useEffect(()=>{
    if(history.location.state !== undefined){
      setExtraSecurity(history.location.state.extra_security)
    }else history.push(`/reset-password/`)
  },[extraSecurity]);

  const ShowSecurityKey = (e) => {
    e.preventDefault();
    dispatch(isShowSecurityKey(true));
  };

  return (
    <>
      <p className="heading">{props.translate("resetpw.extra-security_heading")}</p>
      <div id="reset-pass-display">
        <p>{props.translate("resetpw.extra-security_description")}</p>
        { !show_security_key && extraSecurity && Object.keys(extraSecurity.tokens).length > 0  ?
          <SecurityKeyButton ShowSecurityKey={ShowSecurityKey} extraSecurityKey={Object.keys(extraSecurity.tokens)} translate={props.translate} /> : null
        }
        { !show_security_key && extraSecurity && extraSecurity.phone_numbers.length > 0 ? 
          <SecurityWithSMSButton extraSecurityPhone={extraSecurity.phone_numbers} translate={props.translate}/> : null
        }
        { show_security_key && <SecurityKey /> }
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
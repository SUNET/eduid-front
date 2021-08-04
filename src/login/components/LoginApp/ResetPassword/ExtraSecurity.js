import React, { useEffect, useState }  from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useHistory } from 'react-router-dom';
import EduIDButton from "../../../../components/EduIDButton";
import ResetPasswordLayout from "./ResetPasswordLayout";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { requestPhoneCode } from "../../../redux/actions/postResetPasswordActions";

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

  useEffect(()=>{
    if(history.location.state !== undefined){
      setExtraSecurity(history.location.state.extra_security)
    }else history.push(`/reset-password/`)
  },[extraSecurity]);

  const ShowSecurityKey = (e) => {
    e.preventDefault();
    history.push(`/reset-password/security-key`)
  };

  return (
    <ResetPasswordLayout
      heading={props.translate("resetpw.extra-security_heading")} 
      description={props.translate("resetpw.extra-security_description")} 
      linkInfoText={props.translate("resetpw.without_extra_security")}
      linkText={props.translate("resetpw.continue_reset_password")}
    > 
      { extraSecurity && extraSecurity.tokens && Object.keys(extraSecurity.tokens).length > 0  ?
        <SecurityKeyButton ShowSecurityKey={ShowSecurityKey} extraSecurityKey={Object.keys(extraSecurity.tokens)} translate={props.translate} /> : null
      }
      { extraSecurity && extraSecurity.phone_numbers.length > 0 ? 
        <SecurityWithSMSButton extraSecurityPhone={extraSecurity.phone_numbers} translate={props.translate}/> : null
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
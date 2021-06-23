import React, { useEffect, useState }  from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useHistory } from 'react-router-dom';
import EduIDButton from "../../../../components/EduIDButton";
function ExtraSecurity(props){
  const history = useHistory();
  const [extraSecurity, setExtraSecurity] = useState();

  useEffect(()=>{
    if(history.location.state !== undefined){
      setExtraSecurity(history.location.state.extra_security)
    }else history.push(`/reset-password/`)
  },[extraSecurity])

  return (
    <>
      <p className="heading">{props.translate("resetpw.extra-security_heading")}</p>
      <div id="reset-pass-display">
        <p>{props.translate("resetpw.extra-security_description")}</p>
        { extraSecurity && extraSecurity.phone_numbers.length > 0 ? 
          extraSecurity.phone_numbers.map(phone => {
          return (
            <EduIDButton
              className={"settings-button"}
              id="extra-security-phone-button" 
              key={phone.index}
            > {props.translate("resetpw.extra-phone_send_sms")(
                {phone: phone.number.replace(/^.{10}/g, '**********')})}
            </EduIDButton>
            )
          }) : null 
        }
        { extraSecurity && Object.keys(extraSecurity.tokens).length > 0 ? 
          Object.values(extraSecurity.tokens).map((security) => {
          return (
            <EduIDButton
              className={"settings-button"} 
              id="extra-security-key-button"
              key={security}
            >
              {props.translate("resetpw.use_extra_security_key")}
            </EduIDButton>
            )
          }) : null
        }
        <p>{props.translate("resetpw.without_extra_security")}
          <a href={`/reset-password/set-new-password/`}> {props.translate("resetpw.continue_reset_password")}</a> 
          </p>
      </div>
    </>
  ) 
}

ExtraSecurity.propTypes = {
};

export default InjectIntl(ExtraSecurity);
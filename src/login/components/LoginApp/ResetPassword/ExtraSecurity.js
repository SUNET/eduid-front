import React, { useEffect, useState }  from "react";
import i18n from "../../../translation/InjectIntl_HOC_factory";
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
        <p>Prove that your are the owner of eduID with your extra security. </p>
        { extraSecurity && extraSecurity.phone_numbers.length > 0 ? 
            extraSecurity.phone_numbers.map(phone => {
            return (
              <EduIDButton
                className={"settings-button"}
                id="extra-security-phone-button" 
                key={phone.index}
              >
                SEND SMS TO {phone.number}
              </EduIDButton>)
          }) : 
          extraSecurity && Object.keys(extraSecurity.tokens).length > 0 ? 
            Object.values(extraSecurity.tokens).map((security) => {
            return (
              <EduIDButton
                className={"settings-button"} 
                id="extra-security-key-button"
                key={security}
              >
                USE YOUR SECURITY KEY
              </EduIDButton>
            )
          }) : null
        }
        <div className={"return-new-password"}>
          <p>For your security: You will require to verify your eduID after resetting password without extra security 
            <a href={`/reset-password/set-new-password/`}> Continue without extra security </a>
          </p>
        </div>
      </div>
    </>
  ) 
}

ExtraSecurity.propTypes = {
};

export default i18n(ExtraSecurity);
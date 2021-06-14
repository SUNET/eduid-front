import React, { useEffect, useState }  from "react";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import { useHistory } from 'react-router-dom';
import EduIDButton from "../../../../components/EduIDButton";
function ExtraSecurity(){
  const history = useHistory();
  const extra_security = history.location.state.extra_security;
  const [extraSecurity, setExtraSecurity] = useState(extra_security);

  useEffect(()=>{
    if(extra_security){
      setExtraSecurity(extra_security)
    }
  },[extra_security])

  return (
    <>
      <p className="heading">Extra security</p>
      <div id="reset-pass-display">
        <p>Prove that your are the owner of eduID with your extra security. </p>
        { extraSecurity !== null && extraSecurity.phone_numbers.length > 0 ? 
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
          extraSecurity.tokens && Object.keys(extraSecurity.tokens).length > 0 ? 
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
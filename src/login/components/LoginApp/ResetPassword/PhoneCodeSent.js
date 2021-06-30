import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import SuccessIconAnimation from "./SuccessIconAnimation";
import { RenderingTimer, countDownStart, getLocalStorage, LOCAL_STORAGE_PERSISTED_COUNT } from "./CountDownTimer";

function PhoneCodeSent(props){

  useEffect(()=>{
    const count = getLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT);
    if(count > - 1)
      countDownStart();
  },[])

  return (
    <>
      <SuccessIconAnimation />
      <div id="reset-pass-display">
        <div className="timer">
          <p>{props.translate("resetpw.resend-link")} 
            <RenderingTimer {...props}/>
          </p>
        </div>
      </div>
    </>
  ) 
}

PhoneCodeSent.propTypes = {
  translate: PropTypes.func, 
  sendLink: PropTypes.func,
  invalid: PropTypes.bool
};

export default InjectIntl(withRouter(PhoneCodeSent));
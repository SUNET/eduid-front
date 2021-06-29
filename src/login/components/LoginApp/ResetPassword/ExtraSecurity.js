import React, { useEffect, useState, Fragment }  from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useHistory } from 'react-router-dom';
import EduIDButton from "../../../../components/EduIDButton";
import ConfirmModal from "../../../components/Modals/ConfirmModalContainer";
import { shortCodePattern } from "../../../app_utils/validation/regexPatterns";
import { useDispatch, useSelector } from "react-redux";
import { requestPhoneCode, showModal, savePhoneCode } from "../../../redux/actions/postResetPasswordActions";

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

const SecurityWithSMSButton = ({extraSecurityPhone, translate , setPhone}) => {
  const dispatch = useDispatch();

  const sendConfirmCode = (phone)=>{
    const index = phone.index;
    setPhone(phone);
    dispatch(requestPhoneCode(index));
  };

  return (
    extraSecurityPhone.map(phone => {
      return (
        <Fragment key={phone.index}>
          <br/>
          <EduIDButton
            className={"settings-button"}
            id="extra-security" 
            key={phone.index}
            onClick={()=>sendConfirmCode(phone)}
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
  const [extraSecurity, setExtraSecurity] = useState(null);
  const show_moodal = useSelector(state => state.resetPassword.show_modal);
  const [phone, setPhone] = useState({});
  const dispatch = useDispatch();

  useEffect(()=>{
    if(history.location.state !== undefined){
      setExtraSecurity(history.location.state.extra_security)
    }else history.push(`/reset-password/`)
  },[extraSecurity]);

  const handleCloseModal = () =>{
    dispatch(showModal(false))
  };

  const saveConfirmationCode = () => {
    const code = document
        .getElementById("confirmation-code-area")
        .querySelector("input").value.trim()
    ;
    dispatch(savePhoneCode(code));
    history.push(`/reset-password/set-new-password`)
  }

  return (
    <>
      <p className="heading">{props.translate("resetpw.extra-security_heading")}</p>
      <div id="reset-pass-display">
        <p>{props.translate("resetpw.extra-security_description")}</p>
        { extraSecurity && extraSecurity.tokens && Object.keys(extraSecurity.tokens).length > 0  ?
          <SecurityKeyButton extraSecurityKey={Object.keys(extraSecurity.tokens)} translate={props.translate} /> : null
        }
        { extraSecurity && extraSecurity.phone_numbers.length > 0 ? 
          <SecurityWithSMSButton setPhone={setPhone} extraSecurityPhone={extraSecurity.phone_numbers} translate={props.translate}/> : null
        }
        <p className="decription-without-security">{props.translate("resetpw.without_extra_security")}
          <a href={`/reset-password/set-new-password/`}> {props.translate("resetpw.continue_reset_password")}</a> 
        </p>
        <ConfirmModal
          modalId="phoneConfirmDialog"
          id="phoneConfirmDialogControl"
          title={props.translate("mobile.confirm_title", {
            phone: phone.number!== undefined && phone.number.replace(/^.{10}/g, '**********')
          })}
          resendLabel={props.translate("cm.enter_code")}
          resendHelp={props.translate("cm.lost_code")}
          resendText={props.translate("cm.resend_code")}
          placeholder={props.translate("mobile.placeholder")}
          validationPattern={shortCodePattern}
          validationError={"confirmation.code_invalid_format"}
          showModal={show_moodal}
          closeModal={handleCloseModal}
          handleConfirm={saveConfirmationCode}
        />
      </div>
    </>
  ) 
}

ExtraSecurity.propTypes = {
};

export default InjectIntl(ExtraSecurity);
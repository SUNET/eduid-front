import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import SuccessIconAnimation from "./SuccessIconAnimation";
import { 
    clearCountdown, 
    RenderingResendCodeTimer, 
    countDownStart, 
    getLocalStorage, 
    LOCAL_STORAGE_PERSISTED_COUNT 
} from "./CountDownTimer";
import { shortCodePattern } from "../../../app_utils/validation/regexPatterns";
import EduIDButton from "../../../../components/EduIDButton";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import { Field, reduxForm } from "redux-form";
import { connect, useSelector, useDispatch } from 'react-redux';
import { requestPhoneCode, savePhoneCode } from "../../../redux/actions/postResetPasswordActions";
import { useHistory } from 'react-router-dom';
import { eduidRMAllNotify } from "../../../../actions/Notifications";

const validate = (values) => {
    const value = values.phone;
    let errors = {};
    if (!value || !value.trim()) {
      errors.phone = "required";
      return errors;
    }
  
    if (!shortCodePattern.test(value.trim())){
      errors.phone = "confirmation.code_invalid_format";
      return errors;
    }
  };

let PhoneCodeForm = (props) => (
  <Form id="phone-code-form" role="form" onSubmit={props.savePhoneCode}>
    <Field
      component={CustomInput}
      componentClass="input"
      type="text"
      label={props.translate("cm.enter_code")}
      name="phone"
    />
    <EduIDButton
      className="settings-button"
      id="save-phone-button"
      disabled={props.invalid}
      onClick={props.handlePhoneCode}
    >
      {props.translate("chpass.button_save_password")}
    </EduIDButton>
  </Form>
);
    
  PhoneCodeForm = reduxForm({
    form: "phone-code-form",
    validate,
  })(PhoneCodeForm);
  
  PhoneCodeForm = connect(() => ({
    touchOnChange: true,
    destroyOnUnmount: false,
  }))(PhoneCodeForm);

function PhoneCodeSent(props){
  const phone = useSelector(state => state.resetPassword.phone);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{
    const count = getLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT);
    if(count > - 1 && Object.keys(phone).length){
      countDownStart();
    } 
    else {
      //Navigate to "/reset-password/" without extra security phone
      history.push(`/reset-password/`)
      clearCountdown();
    }
  },[]);

  const resendPhoneCode = (e) => {
    e.preventDefault();
    if(phone){
      dispatch(requestPhoneCode(phone));
    }
  };

  const handlePhoneCode = (e) => {
    e.preventDefault();
    const phoneCode = document.querySelector("input#phone").value;

    if(phoneCode){
      history.push(`/reset-password/set-new-password`);
      dispatch(savePhoneCode(phoneCode));
      dispatch(eduidRMAllNotify());
    }
  };

  return (
    <>
      <SuccessIconAnimation />
      <div id="reset-pass-display">
        <p>{props.translate("mobile.confirm_title")({ phone: phone.number && phone.number.replace(/^.{10}/g, '**********') })}</p>
        <PhoneCodeForm handlePhoneCode={handlePhoneCode} phone={phone} {...props} />
        <div className="timer">
          <RenderingResendCodeTimer resendPhoneCode={resendPhoneCode} {...props}/>
        </div>
      </div>
    </>
  ) 
}

PhoneCodeSent.propTypes = {
  translate: PropTypes.func.isRequired,
  invalid: PropTypes.bool
};

export default InjectIntl(withRouter(PhoneCodeSent));
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import SuccessIconAnimation from "./SuccessIconAnimation";
import { RenderingResendCodeTimer , countDownStart, getLocalStorage, LOCAL_STORAGE_PERSISTED_COUNT } from "./CountDownTimer";
import { shortCodePattern } from "../../../app_utils/validation/regexPatterns";
import EduIDButton from "../../../../components/EduIDButton";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import { Field, reduxForm } from "redux-form";
import { connect, useSelector } from 'react-redux';

const validate = (values) => {
    const value = values.code;
    let errors = {};
    if (!value || !value.trim()) {
      errors.code = "required";
      return errors;
    }
  
    if (!shortCodePattern.test(value.trim())){
      errors.phoneCode = "confirmation.code_invalid_format";
      return errors;
    }
  };

let PhoneCodeForm = (props) => (
    <Form id="phone-code-form" role="form">
      <Field
        component={CustomInput}
        componentClass="input"
        type="text"
        label={props.translate("cm.enter_code")}
        name="code"
      />
      <EduIDButton
        className="settings-button"
        id="save-phone-button"
        disabled={props.invalid}
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
 const number = useSelector(state => state.resetPassword.phone.number);
 
  useEffect(()=>{
    const count = getLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT);
    if(count > - 1)
      countDownStart();
  },[])

  return (
    <>
      <SuccessIconAnimation />
      <p className="heading">Phone code has been sent</p>
      <div id="reset-pass-display">
        <p>{props.translate("mobile.confirm_title")({ phone: number && number.replace(/^.{10}/g, '**********') })}</p>
        <PhoneCodeForm {...props} />
        <div className="timer">
            <RenderingResendCodeTimer  {...props}/>
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
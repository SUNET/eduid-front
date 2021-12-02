import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import {
  clearCountdown,
  countFiveMin,
  getLocalStorage,
  LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE,
} from "./CountDownTimer";
import { shortCodePattern } from "../../../app_utils/validation/regexPatterns";
import EduIDButton from "../../../../components/EduIDButton";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import { Field, reduxForm } from "redux-form";
import { connect, useSelector, useDispatch } from "react-redux";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { useHistory } from "react-router-dom";
import { eduidRMAllNotify } from "../../../../actions/Notifications";

interface ValuesProps {
  [key: string]: string;
}

export interface PhoneCodeFormProps {
  invalid: boolean;
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  handleSubmit: any;
}

const validate = (values: ValuesProps) => {
  const value = values.phone;
  const errors = { phone: "" };
  if (!value || !value.trim()) {
    errors.phone = "required";
    return errors;
  }

  if (!shortCodePattern.test(value.trim())) {
    errors.phone = "confirmation.code_invalid_format";
    return errors;
  }
};

const PhoneCodeForm = (props: PhoneCodeFormProps): JSX.Element => {
  const { handleSubmit } = props;
  <Form id="phone-code-form" role="form" onSubmit={handleSubmit(props.savePhoneCode)}>
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
      {props.translate("cm.ok")}
    </EduIDButton>
  </Form>;
};

const DecoratedPhoneForm = reduxForm({
  form: "phone-code-form",
  validate,
})(PhoneCodeForm);

connect(() => ({
  enableReinitialize: true,
  initialValues: {
    phone: "",
  },
  touchOnChange: true,
  destroyOnUnmount: false,
}))(DecoratedPhoneForm);

function PhoneCodeSent(props) {
  const phone = useSelector((state) => state.resetPassword.phone);
  const dispatch = useDispatch();
  const history = useHistory();
  const url = document.location.href;
  const emailCode = url.split("/").reverse()[0];

  useEffect(() => {
    const count = getLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE);
    if (count && typeof count === "string") {
      const parsedCount = JSON.parse(count);
      if (parsedCount > -1 && Object.keys(phone).length) {
        countFiveMin("phone");
      } else clearCountdown(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE);
    }
  }, []);

  useEffect(() => {
    dispatch(resetPasswordSlice.actions.saveLinkCode(emailCode));
  }, [dispatch]);

  const resendPhoneCode = (e) => {
    e.preventDefault();
    if (phone) {
      dispatch(resetPasswordSlice.actions.requestPhoneCode(phone));
    }
  };

  const handlePhoneCode = (e) => {
    e.preventDefault();
    const phoneCode = document.querySelector("input#phone").value;

    if (phoneCode) {
      history.push(`/reset-password/set-new-password/${emailCode}`);
      dispatch(resetPasswordSlice.actions.savePhoneCode(phoneCode));
      dispatch(resetPasswordSlice.actions.selectExtraSecurity("phoneCode"));
      dispatch(eduidRMAllNotify());
    }
  };

  return (
    <>
      <div id="reset-pass-display">
        <p>
          {props.translate("mobile.confirm_title")({
            phone: phone.number && phone.number.replace(/^.{10}/g, "**********"),
          })}
        </p>
        <PhoneCodeForm handlePhoneCode={handlePhoneCode} phone={phone} {...props} />
        <div className="timer">
          <a id={"resend-phone"} onClick={resendPhoneCode}>
            {props.translate("cm.resend_code")}
          </a>
          <span id="timer-in" className="display-none">
            {props.translate("resetpw.resend-timer-in")}{" "}
          </span>
          <span id="count-down-time-phone" />
        </div>
      </div>
    </>
  );
}

PhoneCodeSent.propTypes = {
  translate: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
};

export default InjectIntl(withRouter(PhoneCodeSent));

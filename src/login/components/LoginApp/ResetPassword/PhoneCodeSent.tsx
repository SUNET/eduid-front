import React, { useEffect } from "react";
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
import { connect, useSelector } from "react-redux";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { useHistory } from "react-router-dom";
import { eduidRMAllNotify } from "../../../../actions/Notifications";
import { useAppDispatch } from "../../../app_init/hooks";
import { translate } from "../../../../login/translation";

interface ValuesProps {
  [key: string]: string;
}

export interface PhoneCodeFormProps {
  invalid: boolean;
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  handleSubmit: any;
  emailCode: string;
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
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handlePhoneCode = (values: ValuesProps) => {
    const phone = values.phone;
    if (phone) {
      history.push(`/reset-password/set-new-password/${props.emailCode}`);
      dispatch(resetPasswordSlice.actions.savePhoneCode(phone));
      dispatch(resetPasswordSlice.actions.selectExtraSecurity("phoneCode"));
      dispatch(eduidRMAllNotify());
    }
  };
  return (
    <Form id="phone-code-form" role="form" onSubmit={handleSubmit(handlePhoneCode)}>
      <Field
        component={CustomInput}
        componentClass="input"
        type="text"
        label={translate("cm.enter_code")}
        name="phone"
      />
      <EduIDButton
        className="settings-button"
        id="save-phone-button"
        disabled={props.invalid}
        onClick={handlePhoneCode}
      >
        {translate("cm.ok")}
      </EduIDButton>
    </Form>
  );
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
  const dispatch = useAppDispatch();
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

  return (
    <>
      <div id="reset-pass-display">
        <p>
          {translate("mobile.confirm_title")({
            phone: phone.number && phone.number.replace(/^.{10}/g, "**********"),
          })}
        </p>
        <PhoneCodeForm emailCode={emailCode} phone={phone} {...props} />
        <div className="timer">
          <a id={"resend-phone"} onClick={resendPhoneCode}>
            {translate("cm.resend_code")}
          </a>
          <span id="timer-in" className="display-none">
            {translate("resetpw.resend-timer-in")}{" "}
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

export default PhoneCodeSent;

import React, { useEffect } from "react";
import {
  clearCountdown,
  countFiveMin,
  getLocalStorage,
  LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE,
} from "./CountDownTimer";
import { shortCodePattern } from "../../../app_utils/validation/regexPatterns";
import EduIDButton from "../../../../components/EduIDButton";
import { Form } from "reactstrap";
import CustomInput from "../../Inputs/CustomInput";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { useHistory } from "react-router-dom";
import { clearNotifications } from "../../../../reducers/Notifications";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import { FormattedMessage, useIntl } from "react-intl";
import { PhoneInterface } from "./ExtraSecurity";

export interface PhoneCodeFormData {
  phone: string;
}
export interface PhoneCodeProps {
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  handleSubmit: any;
  invalid: boolean;
  emailCode: string;
}

const validate = (values: PhoneCodeFormData) => {
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
  return {};
};

const PhoneCodeForm = (props: PhoneCodeProps): JSX.Element => {
  const { handleSubmit } = props;
  const history = useHistory();
  const dispatch = useAppDispatch();

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "mobile.confirm_mobile_placeholder",
    defaultMessage: "Phone confirmation code",
    description: "placeholder text for phone code input",
  });

  const handlePhoneCode = (values: { phone: string }) => {
    const phone = values.phone;
    history.push(`/reset-password/set-new-password/${props.emailCode}`);
    dispatch(resetPasswordSlice.actions.savePhoneCode(phone));
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("phoneCode"));
    dispatch(clearNotifications());
  };

  return (
    <Form id="phone-code-form" role="form" onSubmit={handleSubmit(handlePhoneCode)}>
      <Field
        placeholder={placeholder}
        component={CustomInput}
        componentClass="input"
        type="text"
        label={
          <FormattedMessage
            defaultMessage="Confirmation code"
            description="Reset Password phone code sent (Input label)"
          />
        }
        name="phone"
      />
      <EduIDButton buttonstyle="primary" id="save-phone-button" disabled={props.invalid}>
        <FormattedMessage defaultMessage="OK" description="Reset Password phone code sent (OK button)" />
      </EduIDButton>
    </Form>
  );
};

const DecoratedPhoneForm = reduxForm<PhoneCodeFormData, PhoneCodeProps>({
  form: "phone-code-form",
  validate,
})(PhoneCodeForm);

const ConnectedPhoneForm = connect(() => ({
  enableReinitialize: true,
  initialValues: {
    phone: "",
  },
  touchOnChange: true,
  destroyOnUnmount: false,
}))(DecoratedPhoneForm);

function PhoneCodeSent(props: PhoneCodeProps): JSX.Element {
  const phone = useAppSelector((state) => state.resetPassword.phone);
  // After sending phone code it will be saved in state.resetPassword.phone
  const dispatch = useAppDispatch();
  const url = document.location.href;
  const emailCode = url.split("/").reverse()[0];

  useEffect(() => {
    const count = getLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE);
    if (count && typeof count === "string") {
      const parsedCount = JSON.parse(count);
      if (parsedCount > -1 && phone.number) {
        // If count is still remained in local storage and user has sent phone code, run count down timer
        countFiveMin("phone");
      } else clearCountdown(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE);
    }
  }, []);

  useEffect(() => {
    dispatch(resetPasswordSlice.actions.saveLinkCode(emailCode));
    // Reload page will redirect user to extra security page
  }, [dispatch]);

  const resendPhoneCode = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(resetPasswordSlice.actions.requestPhoneCode(phone as PhoneInterface));
  };

  return (
    <>
      <div id="reset-pass-display">
        <p>
          <FormattedMessage
            defaultMessage="Enter the code sent to {phone}"
            description="Reset Password phone code sent"
            // when user is directed by click "enter phone code" from extra security page, state.resetPassword.phone.number is undefined
            values={{
              phone: <b>{phone.number && phone.number.replace(/^.{10}/g, "**********")}</b>,
            }}
          />
        </p>
        <ConnectedPhoneForm {...props} emailCode={emailCode} />
        <div className="timer">
          <a id={"resend-phone"} onClick={resendPhoneCode}>
            <FormattedMessage defaultMessage="Send a new confirmation code" description="resend code" />
          </a>
          <span id="timer-in" className="display-none">
            <FormattedMessage defaultMessage="in" description="Reset Password phone code sent" />
          </span>
          <span id="count-down-time-phone" />
        </div>
      </div>
    </>
  );
}

export default PhoneCodeSent;

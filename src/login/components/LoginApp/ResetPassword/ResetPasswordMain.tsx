import React, { useEffect } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { connect } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { Field, reduxForm, WrappedFieldProps } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";
import PropTypes from "prop-types";
import { clearCountdown, setLocalStorage } from "./CountDownTimer";
import Splash from "../../../../containers/Splash";
import { Dispatch } from "redux";

export const LOCAL_STORAGE_PERSISTED_EMAIL = "email";

export interface EmailProps {
  email: string;
}
interface EmailFormProps extends WrappedFieldProps {
  sendLink: (event: React.FormEvent<HTMLFormElement>) => void;
  translate(msg: string): any;
  invalid: boolean;
  request_in_progress: boolean;
  validate: string;
  dispatch: Dispatch;
}

let EmailForm = (props: EmailFormProps): JSX.Element => {
  const sendLink = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const email = (document.querySelector("input[name='email']") as HTMLInputElement).value;
    if (email) {
      props.dispatch(resetPasswordSlice.actions.requestEmailLink(email));
      setLocalStorage(LOCAL_STORAGE_PERSISTED_EMAIL, email);
    }
  };
  return (
    <Form id="reset-password-form" role="form" onSubmit={sendLink}>
      <Field
        type="email"
        name="email"
        label={props.translate("profile.email_display_title")}
        componentClass="input"
        id="email-input"
        component={CustomInput}
        translate={props.translate}
        placeholder="name@example.com"
        required={true}
        helpBlock={props.translate("emails.input_help_text")}
      />
      <EduIDButton
        className="settings-button"
        id="reset-password-button"
        disabled={props.invalid || props.request_in_progress}
        onClick={sendLink}
      >
        {props.translate("resetpw.send-link")}
      </EduIDButton>
    </Form>
  );
};

EmailForm = reduxForm<EmailProps>({
  form: "reset-pass-email-form",
  validate,
  touchOnChange: true,
})(EmailForm);

EmailForm = connect(() => ({
  enableReinitialize: true,
  destroyOnUnmount: false,
}))(EmailForm);

type ErrorType = {
  msg: unknown[];
};

interface ResetPasswordMainProps {
  errors: unknown[];
  translate(msg: string): string;
  sendLink: (event: React.MouseEventHandler<HTMLFormElement>) => string;
}
function ResetPasswordMain(props: ResetPasswordMainProps): JSX.Element {
  const dispatch = useAppDispatch();
  const url = document.location.href;
  const loginRef = url.split("/email").reverse()[0];
  const request_in_progress = useAppSelector((state) => state.app.request_in_progress);
  const errors = useAppSelector((state) => state.notifications.errors);

  useEffect(() => {
    clearCountdown();
  }, []);

  useEffect(() => {
    if (errors && errors[0]) {
      // error message is expired-phone-code
      if ((errors[0] as ErrorType).msg.includes("phone-code")) {
        // dispatch useLinkCode to change path to extra-security for resending sms code
        dispatch(resetPasswordSlice.actions.useLinkCode());
      }
    }
  }, [errors]);

  return (
    <>
      {errors && typeof errors[0] && (errors[0] as ErrorType).msg.includes("phone-code") && <Splash />}
      <p className="heading">{props.translate("resetpw.heading-add-email")}</p>
      <EmailForm dispatch={dispatch} {...props} request_in_progress={request_in_progress} />
      <div className={loginRef ? `return-login-link` : `return-login-link disabled`}>
        <a id="return-login" href={`/login/password/${loginRef}`}>
          {props.translate("resetpw.return-login")}
        </a>
      </div>
    </>
  );
}

ResetPasswordMain.propTypes = {
  translate: PropTypes.func,
  sendLink: PropTypes.func,
  invalid: PropTypes.bool,
};

export default InjectIntl(ResetPasswordMain);

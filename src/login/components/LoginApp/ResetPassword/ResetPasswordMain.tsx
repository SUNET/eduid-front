import React, { useEffect } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { connect } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";
import PropTypes from "prop-types";
import { clearCountdown, setLocalStorage } from "./CountDownTimer";
import Splash from "../../../../containers/Splash";

export const LOCAL_STORAGE_PERSISTED_EMAIL = "email";

interface EmailFormData {
  email?: string;
}
interface EmailFormProps {
  requestEmailLink: (event: React.FormEvent<HTMLFormElement>) => void;
  translate(msg: string): string;
  request_in_progress: boolean;
  invalid: boolean;
}

const EmailForm: React.FC<EmailFormProps & InjectedFormProps<EmailFormData, EmailFormProps>> = (
  props: EmailFormProps
): JSX.Element => {
  return (
    <Form id="reset-password-form" role="form" onSubmit={props.requestEmailLink}>
      <Field
        type="email"
        name="email"
        label={props.translate("profile.email_display_title")}
        componentClass="input"
        id="email-input"
        component={CustomInput}
        placeholder="name@example.com"
        required={true}
        helpBlock={props.translate("emails.input_help_text")}
      />
      <EduIDButton
        className="settings-button"
        id="reset-password-button"
        disabled={props.invalid || props.request_in_progress}
        // onClick={sendLink}
      >
        {props.translate("resetpw.send-link")}
      </EduIDButton>
    </Form>
  );
};

const AllEmailForm = reduxForm<EmailFormData, EmailFormProps>({
  form: "reset-pass-email-form",
  validate,
  touchOnChange: true,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(EmailForm);

// EmailForm = connect(() => ({
//   enableReinitialize: true,
//   destroyOnUnmount: false,
// }))(AllEmailForm);

type ErrorType = {
  msg: unknown[];
};

interface ResetPasswordMainProps {
  translate(msg: string): string;
  request_in_progress: boolean;
}
function ResetPasswordMain(
  props: ResetPasswordMainProps & InjectedFormProps<EmailFormData, EmailFormProps>
): JSX.Element {
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

  const requestEmailLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (document.querySelector("input[name='email']") as HTMLInputElement).value;
    if (email) {
      dispatch(resetPasswordSlice.actions.requestEmailLink(email));
      setLocalStorage(LOCAL_STORAGE_PERSISTED_EMAIL, email);
    }
  };

  return (
    <>
      {errors && typeof errors[0] && (errors[0] as ErrorType).msg.includes("phone-code") && <Splash />}
      <p className="heading">{props.translate("resetpw.heading-add-email")}</p>
      <EmailForm requestEmailLink={requestEmailLink} {...props} request_in_progress={request_in_progress} />
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

export default InjectIntl(connect(ResetPasswordMain, AllEmailForm));

import React, { useEffect } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { InjectedFormProps } from "redux-form";
import { clearCountdown, setLocalStorage } from "./CountDownTimer";
import EmailForm, { EmailFormData, EmailFormProps } from "./EmailForm";

export const LOCAL_STORAGE_PERSISTED_EMAIL = "email";

type ErrorType = {
  msg: string[];
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

export default InjectIntl(ResetPasswordMain);

import React, { useEffect } from "react";
import { translate } from "../../../../login/translation";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { clearCountdown, LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK } from "./CountDownTimer";
import EmailForm from "./EmailForm";

export const LOCAL_STORAGE_PERSISTED_EMAIL = "email";

interface ResetPasswordMainProps {
  invalid: boolean;
  request_in_progress: boolean;
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  handleSubmit: any;
}

function ResetPasswordMain(props: ResetPasswordMainProps): JSX.Element {
  const dispatch = useAppDispatch();
  const loginRef = useAppSelector((state) => state.login.ref);
  const request_in_progress = useAppSelector((state) => state.app.request_in_progress);
  const error = useAppSelector((state) => state.notifications.error);

  useEffect(() => {
    clearCountdown(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK);
  }, []);

  useEffect(() => {
    if (error) {
      // error message is expired-phone-code
      if (error.message.match("resetpw.expired-phone-code")) {
        // dispatch useLinkCode to change path to extra-security for resending sms code
        dispatch(resetPasswordSlice.actions.useLinkCode());
      }
    }
  }, [error]);

  return (
    <>
      <p className="heading">{translate("resetpw.heading-add-email")}</p>
      <EmailForm {...props} request_in_progress={request_in_progress} />
      <div className={loginRef ? `return-login-link` : `return-login-link disabled`}>
        <a id="return-login" href={`/login/${loginRef}`}>
          {translate("resetpw.return-login")}
        </a>
      </div>
    </>
  );
}

export default ResetPasswordMain;

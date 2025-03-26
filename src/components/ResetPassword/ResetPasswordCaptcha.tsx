import { CaptchaRequest, getCaptchaRequest, requestEmailLink, sendCaptchaResponse } from "apis/eduidResetPassword";
import { GetCaptchaResponse } from "apis/eduidSignup";
import { InternalCaptcha } from "components/Common/Captcha";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { Fragment, useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

export interface CaptchaProps {
  readonly handleCaptchaCancel: () => void;
  readonly handleCaptchaCompleted: (response: string) => void;
  getCaptcha: () => Promise<GetCaptchaResponse | undefined>;
}

export function ResetPasswordCaptcha(): JSX.Element | null {
  const captcha = useAppSelector((state) => state.resetPassword.captcha);
  const captcha_completed = useAppSelector((state) => state.resetPassword.captcha_completed);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (captcha?.internal_response || captcha_completed) {
      resetPasswordContext.resetPasswordService.send({ type: "COMPLETE" });
    }
  }, [captcha_completed]);

  async function getCaptcha() {
    const res = await dispatch(getCaptchaRequest());
    if (getCaptchaRequest.fulfilled.match(res)) {
      return res.payload;
    }
  }

  function handleCaptchaCancel() {
    if (dashboard_link) {
      document.location.href = dashboard_link;
    }
  }

  function handleCaptchaCompleted(response: string) {
    if (response) {
      dispatch(resetPasswordSlice.actions.setCaptchaResponse({ internal_response: response }));
      resetPasswordContext.resetPasswordService.send({ type: "COMPLETE" });
    }
  }

  const args = { handleCaptchaCancel, handleCaptchaCompleted };

  // If the user has already completed the captcha, don't show it again
  if (captcha_completed) {
    return null;
  }

  return (
    <Fragment>
      <h1>
        <FormattedMessage
          defaultMessage="Reset Password: Confirm that you are a human."
          description="Reset password captcha"
        />
      </h1>

      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage="As a protection against automated spam, you'll need to confirm that you are a human."
            description="Reset password captcha lead text"
          />
        </p>
      </div>

      <InternalCaptcha {...args} />
    </Fragment>
  );
}

export function ProcessCaptcha(): null {
  const captcha = useAppSelector((state) => state.resetPassword.captcha);
  const captcha_completed = useAppSelector((state) => state.resetPassword.captcha_completed);
  const email = useAppSelector((state) => state.resetPassword.email_address);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const dispatch = useAppDispatch();

  async function sendEmailLink() {
    if (email) {
      const response = await dispatch(requestEmailLink({ email }));
      if (requestEmailLink.fulfilled.match(response)) {
        resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
      } else {
        resetPasswordContext.resetPasswordService.send({ type: "START_RESET_PW" });
      }
    }
  }

  async function sendCaptcha(captcha: CaptchaRequest) {
    const res = await dispatch(sendCaptchaResponse(captcha));
    if (sendCaptchaResponse.fulfilled.match(res)) {
      dispatch(clearNotifications());
      sendEmailLink();
    } else {
      resetPasswordContext.resetPasswordService.send({ type: "API_FAIL" });
    }
  }

  useEffect(() => {
    if (captcha_completed) {
      sendEmailLink();
    }
  }, [captcha_completed]);

  useEffect(() => {
    if (captcha) {
      sendCaptcha(captcha);
    }
  }, []);

  // Show a blank screen while we wait for a captcha response from the backend
  return null;
}

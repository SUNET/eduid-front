import { CaptchaRequest, getCaptchaRequest, sendCaptchaResponse } from "apis/eduidResetPassword";
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
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (captcha?.internal_response) {
      resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
    }
  }, []);

  async function getCaptcha() {
    // temporary code
    console.log("is_configured");
    const res = await dispatch(getCaptchaRequest());
    if (getCaptchaRequest.fulfilled.match(res)) {
      return res.payload;
    } else if (res.error.message === "resetpw.captcha-already-completed") {
      resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
    }
  }

  function handleCaptchaCancel() {
    // resetPasswordContext.resetPasswordService.send({ type: "ABORT" });
  }

  function handleCaptchaCompleted(response: string) {
    if (response) {
      dispatch(resetPasswordSlice.actions.setCaptchaResponse({ internal_response: response }));
      resetPasswordContext.resetPasswordService.send({ type: "COMPLETE" });
    }
  }

  const args = { handleCaptchaCancel, handleCaptchaCompleted };

  // If the user has already completed the captcha, don't show it again
  if (captcha?.internal_response) {
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

      <InternalCaptcha {...args} getCaptcha={getCaptcha} />
    </Fragment>
  );
}

export function ProcessCaptcha(): null {
  const captcha = useAppSelector((state) => state.resetPassword.captcha);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const dispatch = useAppDispatch();

  async function sendCaptcha(captcha: CaptchaRequest) {
    const res = await dispatch(sendCaptchaResponse(captcha));

    if (sendCaptchaResponse.fulfilled.match(res)) {
      dispatch(clearNotifications());
      resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
    } else {
      resetPasswordContext.resetPasswordService.send({ type: "API_FAIL" });
    }
  }

  useEffect(() => {
    if (captcha) {
      console.log("ProcessCaptcha captcha");
      sendCaptcha(captcha);
    }
  }, []);

  // Show a blank screen while we wait for a captcha response from the backend
  return null;
}

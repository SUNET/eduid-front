import { resetPasswordApi } from "apis/eduidResetPassword";
import { CaptchaRequest } from "apis/eduidSignup";
import { ApiResponse } from "apis/helpers/types";
import { InternalCaptcha } from "components/Common/Captcha";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useCallback, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import { ResetPasswordStepIndicator } from "./ResetPasswordStepIndicator";

export function ResetPasswordCaptcha(): React.JSX.Element | null {
  const captcha = useAppSelector((state) => state.resetPassword.captcha);
  const captcha_completed = useAppSelector((state) => state.resetPassword.captcha_completed);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
  const dispatch = useAppDispatch();
  const [getCaptchaRequest] = resetPasswordApi.useLazyGetResetPasswordCaptchaRequestQuery();

  useEffect(() => {
    if (captcha?.internal_response || captcha_completed) {
      dispatch(resetPasswordSlice.actions.setNextPage("PROCESS_CAPTCHA"));
    }
  }, [captcha?.internal_response, captcha_completed, dispatch]);

  async function getCaptcha() {
    const response = await getCaptchaRequest();
    if (response.isSuccess) {
      return response.data.payload;
    }
  }

  function handleCaptchaCancel() {
    if (dashboard_link) {
      globalThis.location.href = dashboard_link;
    }
  }

  function handleCaptchaCompleted(response: string) {
    if (response) {
      dispatch(resetPasswordSlice.actions.setCaptchaResponse({ internal_response: response }));
      dispatch(resetPasswordSlice.actions.setNextPage("PROCESS_CAPTCHA"));
    }
  }

  const args = { handleCaptchaCancel, handleCaptchaCompleted };

  // If the user has already completed the captcha, don't show it again
  if (captcha_completed) {
    return null;
  }

  return (
    <div className="step-container">
      <section className="intro">
        <h1>
          <FormattedMessage
            id="captcha.reset"
            defaultMessage="Reset Password: Confirm that you are a human"
            description="Reset password captcha"
          />
        </h1>

        <div className="lead">
          <p>
            <FormattedMessage
              id="common.captchaLead"
              defaultMessage="Confirm that you are a human as protection against automated spam."
              description="Reset password captcha lead text"
            />
          </p>
        </div>

        <InternalCaptcha {...args} getCaptcha={getCaptcha} />
      </section>
      <ResetPasswordStepIndicator currentStep={2} />
    </div>
  );
}

export function ProcessCaptcha(): null {
  const captcha = useAppSelector((state) => state.resetPassword.captcha);
  const captcha_completed = useAppSelector((state) => state.resetPassword.captcha_completed);
  const email = useAppSelector((state) => state.resetPassword.email_address);
  const dispatch = useAppDispatch();
  const [sendCaptchaResponse] = resetPasswordApi.useLazySendResetPasswordCaptchaResponseQuery();
  const [requestEmailLink] = resetPasswordApi.useLazyRequestEmailLinkQuery();
  const [getResetPasswordState] = resetPasswordApi.useLazyGetResetPasswordStateQuery();

  const sendEmailLink = useCallback(async () => {
    if (email) {
      const response = await requestEmailLink({ email });
      if (response.isSuccess) {
        // Refresh the status so the expiry countdown belongs to the code that was just sent.
        await getResetPasswordState();
        dispatch(resetPasswordSlice.actions.setNextPage("EMAIL_LINK_SENT"));
      } else if (
        (response.error as ApiResponse<{ message?: string }>)?.payload?.message !== "resetpw.email-code-too-many-tries"
      ) {
        // On a lockout the slice has already routed to RESET_PW_LOCKED - don't send the user
        // back to a form whose only action returns the same error.
        dispatch(resetPasswordSlice.actions.setNextPage("RESET_PW_ENTER_EMAIL"));
      }
    }
  }, [dispatch, email, requestEmailLink, getResetPasswordState]);

  const sendCaptcha = useCallback(
    async (captcha: CaptchaRequest) => {
      const response = await sendCaptchaResponse(captcha);
      if (response.isSuccess) {
        dispatch(clearNotifications());
        sendEmailLink();
      } else {
        dispatch(resetPasswordSlice.actions.setNextPage("RESET_PW_CAPTCHA"));
      }
    },
    [sendCaptchaResponse, dispatch, sendEmailLink],
  );

  useEffect(() => {
    if (captcha_completed) {
      sendEmailLink();
    }
  }, [captcha_completed, sendEmailLink]);

  useEffect(() => {
    if (captcha && !captcha_completed) {
      sendCaptcha(captcha);
    }
  }, [captcha, captcha_completed, sendCaptcha]);

  // Show a blank screen while we wait for a captcha response from the backend
  return null;
}

import { skipToken } from "@reduxjs/toolkit/query";
import { signupApi } from "apis/eduidSignup";
import { InternalCaptcha } from "components/Common/Captcha";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { signupSlice } from "slices/Signup";
import { ServiceInfo } from "./SignupEntry";
import { SignupStepIndicator } from "./SignupStepIndicator";

export function SignupCaptcha(): React.JSX.Element | null {
  const captchaCompleted = useAppSelector((state) => state.signup.state?.captcha.completed);
  const dispatch = useAppDispatch();
  const [getCaptchaRequest] = signupApi.useLazyGetSignupCaptchaRequestQuery();

  useEffect(() => {
    if (captchaCompleted) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_TOU"));
    }
  }, [captchaCompleted, dispatch]);

  async function getCaptcha() {
    const response = await getCaptchaRequest();
    if (response.isSuccess) {
      return response.data.payload;
    }
  }

  function handleCaptchaCancel() {
    dispatch(signupSlice.actions.setNextPage("SIGNUP_ENTRY"));
  }

  function handleCaptchaCompleted(response: string) {
    if (!response) return;
    dispatch(signupSlice.actions.setCaptchaResponse({ internal_response: response }));
    dispatch(signupSlice.actions.setNextPage("PROCESS_CAPTCHA"));
  }

  const args = { handleCaptchaCancel, handleCaptchaCompleted };

  // If the user has already completed the captcha, don't show it again
  if (captchaCompleted) {
    return null;
  }

  return (
    <div className="step-container">
      <section className="intro">
        <h1>
          <FormattedMessage defaultMessage="Create eduID: Confirm/Accept" description="Signup" />
        </h1>
        <ServiceInfo />
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="Confirm that you are a human as protection against automated spam."
              description="Signup captcha lead text"
            />
          </p>
        </div>
      </section>

      <InternalCaptcha {...args} getCaptcha={getCaptcha} />
      <SignupStepIndicator currentStep={2} />
    </div>
  );
}

export function ProcessCaptcha(): null {
  const captcha = useAppSelector((state) => state.signup.captcha);
  const dispatch = useAppDispatch();
  const { isSuccess, isError } = signupApi.useSendSignupCaptchaResponseQuery(captcha ?? skipToken);

  useEffect(() => {
    if (captcha) {
      if (isSuccess) {
        dispatch(clearNotifications());
        dispatch(signupSlice.actions.setNextPage("SIGNUP_TOU"));
      } else if (isError) {
        dispatch(signupSlice.actions.setNextPage("SIGNUP_CAPTCHA"));
      }
    }
  }, [captcha, isSuccess, isError, dispatch]);

  // Show a blank screen while we wait for a captcha response from the backend
  return null;
}

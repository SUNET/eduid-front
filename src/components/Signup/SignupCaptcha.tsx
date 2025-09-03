import { skipToken } from "@reduxjs/toolkit/query";
import { signupApi } from "apis/eduidSignup";
import { InternalCaptcha } from "components/Common/Captcha";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { Fragment, useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { signupSlice } from "slices/Signup";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export function SignupCaptcha(): React.JSX.Element | null {
  const state = useAppSelector((state) => state.signup.state);
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useAppDispatch();
  const [getCaptchaRequest] = signupApi.useLazyGetSignupCaptchaRequestQuery();

  useEffect(() => {
    if (state?.captcha.completed) {
      signupContext.signupService.send({ type: "CAPTCHA_DONE" });
    }
  }, [state]);

  async function getCaptcha() {
    const response = await getCaptchaRequest();
    if (response.isSuccess) {
      return response.data.payload;
    }
  }


  function handleCaptchaCancel() {
    signupContext.signupService.send({ type: "ABORT" });
  }

  function handleCaptchaCompleted(response: string) {
    if (response) {
      dispatch(signupSlice.actions.setCaptchaResponse({ internal_response: response }));
      signupContext.signupService.send({ type: "COMPLETE" });
    }
  }

  const args = { handleCaptchaCancel, handleCaptchaCompleted };

  // If the user has already completed the captcha, don't show it again
  if (state?.captcha.completed) {
    return null;
  }

  return (
    <Fragment>
      <h1>
        <FormattedMessage defaultMessage="Register: Confirm that you are a human." description="Signup" />
      </h1>

      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage="As a protection against automated spam, you'll need to confirm that you are a human."
            description="Signup captcha lead text"
          />
        </p>
      </div>

      <InternalCaptcha {...args} getCaptcha={getCaptcha}/>
    </Fragment>
  );
}

export function ProcessCaptcha(): null {
  const captcha = useAppSelector((state) => state.signup.captcha);
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useAppDispatch();
  const {isSuccess, isError } = signupApi.useSendSignupCaptchaResponseQuery(captcha??skipToken)

  useEffect(() => {
    if (captcha) {
      if (isSuccess) {
        dispatch(clearNotifications());
        signupContext.signupService.send({ type: "API_SUCCESS" });
      } else if (isError) {
        signupContext.signupService.send({ type: "API_FAIL" });
      }
    }
  }, [captcha, isSuccess, isError]);

  // Show a blank screen while we wait for a captcha response from the backend
  return null;
}

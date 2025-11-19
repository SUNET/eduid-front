import { skipToken } from "@reduxjs/toolkit/query";
import { signupApi } from "apis/eduidSignup";
import { InternalCaptcha } from "components/Common/Captcha";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { Fragment, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { signupSlice } from "slices/Signup";

export function SignupCaptcha(): React.JSX.Element | null {
  const state = useAppSelector((state) => state.signup.state);
  const dispatch = useAppDispatch();
  const [getCaptchaRequest] = signupApi.useLazyGetSignupCaptchaRequestQuery();

  useEffect(() => {
    if (state?.captcha.completed) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_TOU"));
    }
  }, [state, dispatch]);

  async function getCaptcha() {
    const response = await getCaptchaRequest();
    if (response.isSuccess) {
      return response.data.payload;
    }
  }

  function handleCaptchaCancel() {
    dispatch(signupSlice.actions.setNextPage("SIGNUP_EMAIL_FORM"));
  }

  function handleCaptchaCompleted(response: string) {
    if (response) {
      dispatch(signupSlice.actions.setCaptchaResponse({ internal_response: response }));
      dispatch(signupSlice.actions.setNextPage("PROCESS_CAPTCHA"));
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
        <FormattedMessage defaultMessage="Create eduID: Confirm that you are a human." description="Signup" />
      </h1>

      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage="As a protection against automated spam, you'll need to confirm that you are a human."
            description="Signup captcha lead text"
          />
        </p>
      </div>

      <InternalCaptcha {...args} getCaptcha={getCaptcha} />
    </Fragment>
  );
}

export function ProcessCaptcha(): null {
  const captcha = useAppSelector((state) => state.signup.captcha);
  const dispatch = useAppDispatch();
  const { isSuccess, isError } = signupApi.useSendSignupCaptchaResponseQuery(captcha ?? skipToken);

  useEffect(() => {
    if (captcha) {
      if (isSuccess) {
        dispatch(signupSlice.actions.setNextPage("SIGNUP_TOU"));
      } else if (isError) {
        dispatch(signupSlice.actions.setNextPage("SIGNUP_CAPTCHA"));
      }
    }
  }, [captcha, isSuccess, isError, dispatch]);

  // Show a blank screen while we wait for a captcha response from the backend
  return null;
}

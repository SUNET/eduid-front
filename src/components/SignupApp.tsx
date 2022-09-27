import { fetchState, registerEmailRequest, sendCaptchaResponse } from "apis/eduidSignup";
import SignupEmailForm from "login/components/RegisterEmail/SignupEmailForm";
import { useEffect } from "react";
import { signupSlice } from "reducers/Signup";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import Captcha from "./Captcha";
import SignupEnterCode from "./SignupEnterCode";

type currentSteps = "captcha" | "email" | "enter-code" | "tou" | "credentials" | "create";

export function SignupApp(): JSX.Element {
  const email = useSignupAppSelector((state) => state.signup.email);
  const signupState = useSignupAppSelector((state) => state.signup.state);
  const dispatch = useSignupAppDispatch();
  let currentStep: currentSteps | undefined = undefined;

  function handleCaptchaCancel() {
    dispatch(signupSlice.actions.setEmail(undefined));
  }

  async function handleCaptchaCompleted(recaptcha_response: string) {
    if (recaptcha_response) {
      const res = await dispatch(sendCaptchaResponse({ recaptcha_response }));
      if (sendCaptchaResponse.fulfilled.match(res)) {
        if (email) {
          dispatch(registerEmailRequest({ email }));
        }
      }
    }
  }

  //else if (email && signupState?.captcha_completed && !signupState?.email_verification.sent_at) {

  useEffect(() => {
    dispatch(fetchState());
  }, []);

  if (!email && !signupState?.email_verification.email) {
    currentStep = "email";
  } else if (!signupState?.captcha_completed) {
    currentStep = "captcha";
  } else if (signupState?.email_verification.sent_at && !signupState?.email_verification.verified) {
    currentStep = "enter-code";
  } else if (!signupState?.tou_accepted) {
    // show tou
  }

  return (
    <div id="content" className="horizontal-content-margin content">
      <h1>{currentStep}</h1>
      {currentStep === "email" && <SignupEmailForm />}
      {currentStep === "captcha" && (
        <Captcha handleCaptchaCancel={handleCaptchaCancel} handleCaptchaCompleted={handleCaptchaCompleted} />
      )}
      {currentStep === "enter-code" && <SignupEnterCode />}
    </div>
  );
}

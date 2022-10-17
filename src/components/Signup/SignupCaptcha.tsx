import { CaptchaRequest, sendCaptchaResponse } from "apis/eduidSignup";
import Captcha from "components/Captcha";
import { useContext, useEffect } from "react";
import { signupSlice } from "reducers/Signup";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import { SignupCaptchaForm } from "./SignupCaptchaForm";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export function SignupCaptcha() {
  const signupState = useSignupAppSelector((state) => state.signup.state);

  if (signupState?.captcha.internal) {
    return <InternalCaptcha />;
  }

  return <GoogleCaptcha />;
}

function InternalCaptcha() {
  const dispatch = useSignupAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);

  function handleCaptchaCancel() {
    signupContext.signupService.send({ type: "ABORT" });
  }

  async function handleCaptchaCompleted(internal_response: string) {
    if (internal_response) {
      signupContext.signupService.send({ type: "COMPLETE" });

      const res = await dispatch(sendCaptchaResponse({ internal_response }));

      if (sendCaptchaResponse.fulfilled.match(res) && res.payload.captcha.completed === true) {
        signupContext.signupService.send({ type: "API_SUCCESS" });
      } else {
        signupContext.signupService.send({ type: "API_FAIL" });
      }
    }
  }

  return (
    <SignupCaptchaForm handleCaptchaCancel={handleCaptchaCancel} handleCaptchaCompleted={handleCaptchaCompleted} />
  );
}

function GoogleCaptcha() {
  const dispatch = useSignupAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);

  function handleCaptchaCancel() {
    signupContext.signupService.send({ type: "ABORT" });
  }

  async function handleCaptchaCompleted(recaptcha_response: string) {
    if (recaptcha_response) {
      dispatch(signupSlice.actions.setCaptchaResponse({ recaptcha_response }));
      signupContext.signupService.send({ type: "COMPLETE" });
    }
  }

  return <Captcha handleCaptchaCancel={handleCaptchaCancel} handleCaptchaCompleted={handleCaptchaCompleted} />;
}

export function ProcessCaptcha(): null {
  const captcha = useSignupAppSelector((state) => state.signup.captcha);
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useSignupAppDispatch();

  async function sendCaptcha(captcha: CaptchaRequest) {
    const res = await dispatch(sendCaptchaResponse(captcha));

    if (sendCaptchaResponse.fulfilled.match(res)) {
      signupContext.signupService.send({ type: "API_SUCCESS" });
    } else {
      signupContext.signupService.send({ type: "API_FAIL" });
    }
  }

  useEffect(() => {
    if (captcha) {
      sendCaptcha(captcha);
    }
  }, []);

  // Show a blank screen while we wait for a captcha response from the backend
  return null;
}

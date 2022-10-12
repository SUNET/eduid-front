import { sendCaptchaResponse } from "apis/eduidSignup";
import { useContext } from "react";
import { signupSlice } from "reducers/Signup";
import { useSignupAppDispatch } from "signup-hooks";
import Captcha from "components/Captcha";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export function SignupCaptcha() {
  const dispatch = useSignupAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);

  function handleCaptchaCancel() {
    dispatch(signupSlice.actions.setEmail(undefined));
  }

  async function handleCaptchaCompleted(recaptcha_response: string) {
    if (recaptcha_response) {
      signupContext.signupService.send({ type: "COMPLETE" });

      const res = await dispatch(sendCaptchaResponse({ recaptcha_response }));

      if (sendCaptchaResponse.fulfilled.match(res) && res.payload.captcha.completed === true) {
        signupContext.signupService.send({ type: "API_SUCCESS" });
      } else {
        signupContext.signupService.send({ type: "API_FAIL" });
      }
    }
  }

  return <Captcha handleCaptchaCancel={handleCaptchaCancel} handleCaptchaCompleted={handleCaptchaCompleted} />;
}

export function ProcessCaptcha(): null {
  // Show a blank screen while we wait for a captcha response from the backend
  return null;
}

import { CaptchaRequest, getCaptchaRequest, sendCaptchaResponse } from "apis/eduidSignup";
import Captcha from "components/Captcha";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { signupSlice } from "reducers/Signup";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import { SignupCaptchaForm } from "./SignupCaptchaForm";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export function SignupCaptcha(): JSX.Element | null {
  const preferredCaptcha = useSignupAppSelector((state) => state.config.preferred_captcha);
  const state = useSignupAppSelector((state) => state.signup.state);
  const signupContext = useContext(SignupGlobalStateContext);

  if (state?.captcha.completed) {
    signupContext.signupService.send({ type: "BYPASS" });
    return null;
  }

  return (
    <Fragment>
      <h1 className="register-header">
        <FormattedMessage defaultMessage="Confirm that you are a human." description="Signup" />
      </h1>
      <div>{preferredCaptcha === "internal" ? <InternalCaptcha /> : <GoogleCaptcha />}</div>
    </Fragment>
  );
}

function InternalCaptcha() {
  const dispatch = useSignupAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);
  const [img, setImg] = useState<string | undefined>(undefined);

  async function getCaptcha() {
    const res = await dispatch(getCaptchaRequest());

    if (getCaptchaRequest.fulfilled.match(res)) {
      return res.payload.captcha_img;
    }
  }

  useEffect(() => {
    let aborted = false; // flag to avoid updating unmounted components after this async promise resolves

    if (!img) {
      getCaptcha().then((img) => {
        if (!aborted && img) setImg(img);
      });
    }

    // create a cleanup function that will allow the async code above to realise it shouldn't
    // try to update state on an unmounted react component
    return () => {
      aborted = true;
    };
  }, [img]);

  function handleCaptchaCancel() {
    signupContext.signupService.send({ type: "ABORT" });
  }

  async function handleCaptchaCompleted(internal_response: string) {
    if (internal_response) {
      dispatch(signupSlice.actions.setCaptchaResponse({ internal_response }));
      signupContext.signupService.send({ type: "COMPLETE" });
    }
  }

  return (
    <React.Fragment>
      <figure className="x-adjust">
        <img className="captcha-image" src={img} />
      </figure>

      <SignupCaptchaForm handleCaptchaCancel={handleCaptchaCancel} handleCaptchaCompleted={handleCaptchaCompleted} />
    </React.Fragment>
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

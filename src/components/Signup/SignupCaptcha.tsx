import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CaptchaRequest, GetCaptchaResponse, getCaptchaRequest, sendCaptchaResponse } from "apis/eduidSignup";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { signupSlice } from "slices/Signup";
import { SignupCaptchaForm } from "./SignupCaptchaForm";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export interface CaptchaProps {
  readonly handleCaptchaCancel: () => void;
  readonly handleCaptchaCompleted: (response: string) => void;
}

export function SignupCaptcha(): JSX.Element | null {
  const state = useAppSelector((state) => state.signup.state);
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state?.captcha.completed) {
      signupContext.signupService.send({ type: "BYPASS" });
    }
  }, [state]);

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

      <InternalCaptcha {...args} />
    </Fragment>
  );
}

function InternalCaptcha(props: CaptchaProps) {
  const dispatch = useAppDispatch();
  const [captchaResponse, setCaptchaResponse] = useState<GetCaptchaResponse>();

  async function getCaptcha() {
    const res = await dispatch(getCaptchaRequest());
    if (getCaptchaRequest.fulfilled.match(res)) {
      return res.payload;
    }
  }

  function getNewCaptcha() {
    getCaptcha().then((captcha: GetCaptchaResponse | undefined) => {
      setCaptchaResponse({
        captcha_img: captcha?.captcha_img,
        captcha_audio: captcha?.captcha_audio,
      });
    });
  }

  useEffect(() => {
    let aborted = false; // flag to avoid updating unmounted components after this promise resolves

    if (!captchaResponse) {
      getCaptcha().then((captchaResponse: any) => {
        if (!aborted && captchaResponse) {
          setCaptchaResponse({
            captcha_img: captchaResponse.captcha_img,
            captcha_audio: captchaResponse.captcha_audio,
          });
        }
      });
    }

    // create a cleanup function that will allow the async code above to realise it shouldn't
    // try to update state on an unmounted react component
    return () => {
      aborted = true;
    };
  }, []);

  return (
    <React.Fragment>
      <figure className="captcha-responsive">
        <img alt="captcha" className="captcha-image" src={captchaResponse?.captcha_img} />
        <audio controls className="captcha-audio" src={captchaResponse?.captcha_audio} />
      </figure>
      <div className="icon-text">
        <button
          type="button"
          className="icon-only"
          aria-label="name-check"
          disabled={!captchaResponse?.captcha_img}
          onClick={getNewCaptcha}
        >
          <FontAwesomeIcon icon={faRedo as IconProp} />
        </button>
        <label htmlFor="name-check" className="hint">
          <FormattedMessage defaultMessage="Generate a new captcha image" description="captcha img change" />
        </label>
      </div>
      <SignupCaptchaForm {...props} />
    </React.Fragment>
  );
}
export function ProcessCaptcha(): null {
  const captcha = useAppSelector((state) => state.signup.captcha);
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useAppDispatch();

  async function sendCaptcha(captcha: CaptchaRequest) {
    const res = await dispatch(sendCaptchaResponse(captcha));

    if (sendCaptchaResponse.fulfilled.match(res)) {
      dispatch(clearNotifications());
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

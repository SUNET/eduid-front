import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CaptchaRequest, getCaptchaRequest, sendCaptchaResponse } from "apis/eduidSignup";
import { Captcha as GoogleCaptcha } from "components/Captcha";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "reducers/Notifications";
import { signupSlice } from "reducers/Signup";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import { SignupCaptchaForm } from "./SignupCaptchaForm";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export interface CaptchaProps {
  handleCaptchaCancel: () => void;
  handleCaptchaCompleted: (response: string) => void;
  toggleCaptcha: () => void;
}

export function SignupCaptcha(): JSX.Element | null {
  const preferredCaptcha = useSignupAppSelector((state) => state.config.preferred_captcha);
  const state = useSignupAppSelector((state) => state.signup.state);
  const signupContext = useContext(SignupGlobalStateContext);
  const [useInternalCaptcha, setUseInternalCaptcha] = useState<boolean>(preferredCaptcha === "internal");
  const dispatch = useSignupAppDispatch();

  useEffect(() => {
    if (state?.captcha.completed) {
      signupContext.signupService.send({ type: "BYPASS" });
    }
  }, [state]);

  function handleCaptchaCancel() {
    signupContext.signupService.send({ type: "ABORT" });
  }

  function handleCaptchaCompleted(response: string) {
    if (useInternalCaptcha) {
      dispatch(signupSlice.actions.setCaptchaResponse({ internal_response: response }));
    } else {
      dispatch(signupSlice.actions.setCaptchaResponse({ recaptcha_response: response }));
    }
    signupContext.signupService.send({ type: "COMPLETE" });
  }

  function toggleCaptcha() {
    setUseInternalCaptcha(!useInternalCaptcha);
  }

  const args = { handleCaptchaCancel, handleCaptchaCompleted, toggleCaptcha };

  return (
    <Fragment>
      <h1>
        <FormattedMessage defaultMessage="Confirm that you are a human." description="Signup" />
      </h1>

      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage="This question is for testing whether you are a human visiter and to prevent automated span submissions."
            description="Signup captcha lead text"
          />
        </p>
      </div>

      <fieldset>
        <label className="toggle flex-between" htmlFor="captcha-switch">
          <span>
            <FormattedMessage defaultMessage="Switch captcha variant" description="captcha option" />
          </span>
          <input
            onChange={toggleCaptcha}
            className="toggle-checkbox"
            type="checkbox"
            checked={useInternalCaptcha ? false : true}
            id="captcha-switch"
          />
          <div className="toggle-switch"></div>
        </label>
      </fieldset>

      <div>{useInternalCaptcha ? <InternalCaptcha {...args} /> : <GoogleCaptcha {...args} />}</div>
    </Fragment>
  );
}

function InternalCaptcha(props: CaptchaProps) {
  const dispatch = useSignupAppDispatch();
  const [img, setImg] = useState<string | undefined>(undefined);

  async function getCaptcha() {
    const res = await dispatch(getCaptchaRequest());
    if (getCaptchaRequest.fulfilled.match(res)) {
      return res.payload.captcha_img;
    }
  }

  function getNewCaptcha() {
    getCaptcha().then((img) => {
      setImg(img);
    });
  }

  useEffect(() => {
    let aborted = false; // flag to avoid updating unmounted components after this promise resolves

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

  return (
    <React.Fragment>
      <figure className="x-adjust">
        <img className="captcha-image" src={img} />
        <div className="icon-text">
          <button type="button" className="icon-only" aria-label="name-check" disabled={!img} onClick={getNewCaptcha}>
            <FontAwesomeIcon icon={faRedo as IconProp} />
          </button>
          <label htmlFor="name-check" className="hint">
            <FormattedMessage defaultMessage="Generate a new captcha" description="captcha img change" />
          </label>
        </div>
      </figure>
      <SignupCaptchaForm {...props} />
    </React.Fragment>
  );
}
export function ProcessCaptcha(): null {
  const captcha = useSignupAppSelector((state) => state.signup.captcha);
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useSignupAppDispatch();

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

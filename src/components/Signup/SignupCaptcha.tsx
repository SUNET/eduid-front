import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CaptchaRequest, getCaptchaRequest, sendCaptchaResponse } from "apis/eduidSignup";
import { Captcha as GoogleCaptcha } from "components/Common/Captcha";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { signupSlice } from "slices/Signup";
import { SignupCaptchaForm } from "./SignupCaptchaForm";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export interface CaptchaProps {
  handleCaptchaCancel: () => void;
  handleCaptchaCompleted: (response: string) => void;
  toggleCaptcha: () => void;
}

export function SignupCaptcha(): JSX.Element | null {
  const preferredCaptcha = useAppSelector((state) => state.config.preferred_captcha);
  const state = useAppSelector((state) => state.signup.state);
  const signupContext = useContext(SignupGlobalStateContext);
  const [useInternalCaptcha, setUseInternalCaptcha] = useState<boolean>(preferredCaptcha === "internal");
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

  // If the user has already completed the captcha, don't show it again
  if (state?.captcha.completed) {
    return null;
  }

  return (
    <Fragment>
      <h1>
        <FormattedMessage defaultMessage="Confirm that you are a human." description="Signup" />
      </h1>

      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage="As a protection against automated spam, you'll need to confirm that you are a human."
            description="Signup captcha lead text"
          />
        </p>
      </div>

      <fieldset>
        <label className="toggle flex-between" htmlFor="captcha-switch">
          <span>
            <FormattedMessage
              defaultMessage="Use a validation service provided by a third party"
              description="captcha option"
            />
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
      {useInternalCaptcha ? <InternalCaptcha {...args} /> : <GoogleCaptcha {...args} />}
    </Fragment>
  );
}

function InternalCaptcha(props: CaptchaProps) {
  const dispatch = useAppDispatch();
  const [img, setImg] = useState<string | undefined>(undefined);
  const [audio, setAudio] = useState<string | undefined>(undefined);

  async function getCaptcha() {
    const res = await dispatch(getCaptchaRequest());
    if (getCaptchaRequest.fulfilled.match(res)) {
      return res.payload;
    }
  }

  function getNewCaptcha() {
    getCaptcha().then((captcha: any) => {
      setImg(captcha.captcha_img);
      setAudio(captcha.captcha_audio);
    });
  }

  useEffect(() => {
    let aborted = false; // flag to avoid updating unmounted components after this promise resolves

    if (!img) {
      getCaptcha().then((img: any) => {
        if (!aborted && img) setImg(img.captcha_img);
      });
    }

    if (!audio) {
      getCaptcha().then((audio: any) => {
        if (!aborted && audio) setAudio(audio.captcha_audio);
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
      <figure className="captcha-responsive">
        <img alt="captcha image" className="captcha-image" src={img} />
        <audio controls className="captcha-audio" src={audio} />
      </figure>
      <div className="icon-text">
        <button type="button" className="icon-only" aria-label="name-check" disabled={!img} onClick={getNewCaptcha}>
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

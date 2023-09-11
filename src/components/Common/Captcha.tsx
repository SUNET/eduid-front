import { CaptchaProps } from "components/Signup/SignupCaptcha";
import { useIndexAppSelector as useSignupAppSelector } from "index-hooks";
import React, { useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import Recaptcha from "react-recaptcha";
import ScriptLoader from "react-script-loader-hoc";
import EduIDButton from "./EduIDButton";
import Splash from "./Splash";

interface LoadingCaptchaProps extends CaptchaProps {
  scriptsLoadedSuccessfully: boolean; // inserted by ScriptLoader
  scriptLoadedCallback(): void;
}

function LoadingCaptcha(props: LoadingCaptchaProps) {
  const recaptcha_key = useSignupAppSelector((state) => state.config.recaptcha_public_key);

  function loadedCaptcha() {
    console.log("Loaded recaptcha");
    props.scriptLoadedCallback();
  }

  return (
    <React.Fragment>
      <div id="captcha-container">
        <div id="captcha">
          <Recaptcha
            sitekey={recaptcha_key}
            render="explicit"
            verifyCallback={props.handleCaptchaCompleted}
            onloadCallback={loadedCaptcha}
          />
        </div>
        <div id="captcha-buttons" className="buttons">
          <EduIDButton onClick={props.handleCaptchaCancel} buttonstyle="secondary" id="cancel-captcha-button">
            <FormattedMessage defaultMessage="Cancel" description="Signup cancel button" />
          </EduIDButton>
          <DevSubmitCaptchaButton {...props} />
        </div>
      </div>
    </React.Fragment>
  );
}

function DevSubmitCaptchaButton(props: CaptchaProps): JSX.Element | null {
  const environment = useSignupAppSelector((state) => state.config.environment);

  // Only show this button in the staging environment. This button is bad user experience
  // for real users, but required for the Selenium tests to be able to bypass the captcha with the use
  // of a magic cookie.
  if (environment === "staging") {
    return (
      <EduIDButton
        buttonstyle="primary"
        id="send-captcha-button"
        onClick={() => {
          props.handleCaptchaCompleted("testing");
        }}
      >
        Dev submit captcha
      </EduIDButton>
    );
  }

  return null;
}

export function Captcha(props: CaptchaProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const WrappedCaptcha = useMemo(
    () => ScriptLoader("https://www.google.com/recaptcha/api.js?render=explicit")(LoadingCaptcha),
    []
  );

  function scriptLoadedCallback() {
    setScriptLoaded(true);
  }

  return (
    <React.Fragment>
      <Splash showChildren={scriptLoaded}>
        <WrappedCaptcha {...props} scriptLoadedCallback={scriptLoadedCallback} />
      </Splash>
    </React.Fragment>
  );
}

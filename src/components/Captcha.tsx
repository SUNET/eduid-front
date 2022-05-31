import EduIDButton from "components/EduIDButton";
import React, { useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import Recaptcha from "react-recaptcha";
import ScriptLoader from "react-script-loader-hoc";
import { useSignupAppSelector } from "signup-hooks";
import Splash from "./Splash";

interface CaptchaProps {
  handleCaptchaCancel(): void;
  handleCaptchaCompleted(response: string): void;
}

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
        </div>
      </div>
    </React.Fragment>
  );
}

function Captcha(props: CaptchaProps) {
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
      <h1 className="register-header">
        <FormattedMessage defaultMessage="Confirm that you are a human." description="Signup" />
      </h1>
      <Splash showChildren={scriptLoaded}>
        <WrappedCaptcha {...props} scriptLoadedCallback={scriptLoadedCallback} />
      </Splash>
    </React.Fragment>
  );
}

export default Captcha;

import EduIDButton from "components/EduIDButton";
import React, { useEffect, useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import Recaptcha from "react-recaptcha";
import { useHistory } from "react-router";
import ScriptLoader from "react-script-loader-hoc";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
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
  // const dispatch = useSignupAppDispatch();
  // const history = useHistory();
  const recaptcha_key = useSignupAppSelector((state) => state.config.recaptcha_public_key);
  // const email = useSignupAppSelector((state) => state.signup.email);
  // const tou_accepted = useSignupAppSelector((state) => state.signup.tou_accepted);
  // const [captchaResponse, setCaptchaResponse] = useState<string | undefined>();

  // if (this.props.fetching === this.props.scriptsLoadedSuccessfully) {
  //   this.props.setFetching(!this.props.scriptsLoadedSuccessfully);
  // }

  function loadedCaptcha() {
    console.log("Loaded recaptcha");
    props.scriptLoadedCallback();
  }
  // function handleCaptcha(response: string) {
  //   // Callback invoked by the Recaptcha component when the user has completed the captcha.
  //   // The 'response' is passed to the backend for verification when the user clicks Done.
  //   console.log("HANDLE CAPTCHA: ", response);
  //   //    dispatch(verifyCaptcha(response));
  //   setCaptchaResponse(response);
  // }

  // function handleAccept() {
  //   console.log("SEND CAPTCHA");
  //   //    dispatch(postCaptcha());
  //   if (captchaResponse && email && tou_accepted) {
  //     dispatch(fetchTryCaptcha({ email, tou_accepted, recaptcha_response: captchaResponse }));
  //   }
  // }

  // function cancelCaptcha() {
  //   console.log("CANCEL CAPTCHA");
  //   setCaptchaResponse(undefined);
  //   history.push("email");
  // }

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

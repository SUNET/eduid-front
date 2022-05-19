import { fetchTryCaptcha } from "apis/eduidSignup";
import EduIDButton from "components/EduIDButton";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import Recaptcha from "react-recaptcha";
import { useHistory } from "react-router";
import ScriptLoader from "react-script-loader-hoc";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import Splash from "./Splash";

interface CaptchaProps {
  scriptsLoadedSuccessfully: boolean;
}

function LoadingCaptcha(props: CaptchaProps) {
  const dispatch = useSignupAppDispatch();
  const history = useHistory();
  const recaptcha_key = useSignupAppSelector((state) => state.config.recaptcha_public_key);
  const email = useSignupAppSelector((state) => state.email.email);
  const tou_accepted = useSignupAppSelector((state) => state.email.tou_accepted);
  const [captchaResponse, setCaptchaResponse] = useState<string | undefined>();

  // if (this.props.fetching === this.props.scriptsLoadedSuccessfully) {
  //   this.props.setFetching(!this.props.scriptsLoadedSuccessfully);
  // }

  function loadedCaptcha() {
    console.log("Loaded recaptcha");
  }
  function handleCaptcha(response: string) {
    // Callback invoked by the Recaptcha component when the user has completed the captcha.
    // The 'response' is passed to the backend for verification when the user clicks Done.
    console.log("HANDLE CAPTCHA: ", response);
    //    dispatch(verifyCaptcha(response));
    setCaptchaResponse(response);
  }

  function handleAccept() {
    console.log("SEND CAPTCHA");
    //    dispatch(postCaptcha());
    if (captchaResponse && email && tou_accepted) {
      dispatch(fetchTryCaptcha({ email, tou_accepted, recaptcha_response: captchaResponse }));
    }
  }

  function cancelCaptcha() {
    console.log("CANCEL CAPTCHA");
    setCaptchaResponse(undefined);
    history.push("email");
  }

  return (
    <div key="0" id="content" className="horizontal-content-margin content">
      <h1 className="register-header">
        <FormattedMessage defaultMessage="Confirm that you are a human." description="Signup" />
      </h1>
      <Splash showChildren={props.scriptsLoadedSuccessfully}>
        <div key="1" id="captcha-container">
          <div id="captcha">
            <Recaptcha
              sitekey={recaptcha_key}
              render="explicit"
              verifyCallback={handleCaptcha}
              onloadCallback={loadedCaptcha}
            />
          </div>
          <div id="captcha-buttons" className="buttons">
            <EduIDButton onClick={cancelCaptcha} buttonstyle="secondary" id="cancel-captcha-button">
              <FormattedMessage defaultMessage="Cancel" description="Signup cancel button" />
            </EduIDButton>
            <EduIDButton
              buttonstyle="primary"
              onClick={handleAccept}
              id="send-captcha-button"
              disabled={!tou_accepted || !email || !captchaResponse}
            >
              <FormattedMessage defaultMessage="Done" description="Signup done button" />
            </EduIDButton>
          </div>
        </div>
      </Splash>
    </div>
  );
}

// Captcha.propTypes = {
//   recaptcha_key: PropTypes.string,
//   handleCaptcha: PropTypes.func,
//   fetching: PropTypes.bool,
//   setFetching: PropTypes.func,
// };

const Captcha = ScriptLoader("https://www.google.com/recaptcha/api.js?render=explicit")(LoadingCaptcha);

// export default (props) => (
//   <FetchingContext.Consumer>
//     {({ fetching, setFetching }) => <LoadingCaptcha {...props} fetching={fetching} setFetching={setFetching} />}
//   </FetchingContext.Consumer>
// );

export default Captcha;

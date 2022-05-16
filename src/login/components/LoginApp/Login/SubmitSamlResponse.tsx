import EduIDButton from "components/EduIDButton";
import ShowAfterDelay from "components/ShowAfterDelay";
import { useAppSelector } from "login/app_init/hooks";
import React, { Fragment, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

function SubmitSamlResponse() {
  const [error, setError] = useState(false);
  const [backDetected, setBackDetected] = useState(false);

  const SAMLParameters = useAppSelector((state) => state.login.saml_parameters);

  useEffect(() => {
    /* Auto-submit form unless backend says the SAML response has already been used once,
     * or we detect that the user has pressed the 'back' button in the browser.
     */
    if (document.forms[0] && SAMLParameters) {
      if (!SAMLParameters.used && !backDetected) {
        document.forms[0].submit();
      }
    } else {
      setError(true);
    }
  }, []);

  useEffect(() => {
    /* Listen for a window onPageShow event, indicating the user has pressed the 'back' button.
     * Firefox renders this page again if the user presses 'back' right after login, whilst Chrome
     * re-renders the page, in which case the SAMLParameters.used should enable us to inform the
     * user that re-posting the SAML response is unlikely to work.
     */
    window.onpageshow = function (event) {
      if (event.persisted) {
        setBackDetected(true);
      }
    };
  }, []);

  if (error) {
    return (
      <Fragment>
        <h1>
          <FormattedMessage defaultMessage="Login failed" description="SAML login finished" />
        </h1>
        <p>
          <FormattedMessage
            defaultMessage="Missing SAML parameters to proceed with login. Please try again."
            description="SAML login finished"
          />
        </p>
      </Fragment>
    );
  }

  if (SAMLParameters?.used) {
    return (
      <Fragment>
        <h1>
          <FormattedMessage defaultMessage="Already logged in" description="SAML login finished" />
        </h1>
        <p>
          <FormattedMessage defaultMessage="This login has already been processed." description="SAML login finished" />
        </p>
        <p>
          <FormattedMessage
            defaultMessage={`You can try to login again using the button below, but it is very likely
          that the service you are logging in to will reject the request and you will have to start over.
          `}
            description="SAML login finished"
          />
        </p>
        <SAMLResponseForm mode="retry" />
      </Fragment>
    );
  }

  if (backDetected) {
    return (
      <Fragment>
        <h1>
          <FormattedMessage defaultMessage="Already logged in" description="SAML login finished" />
        </h1>
        <p>
          <FormattedMessage
            defaultMessage="It seems you pressed 'back' in your browser."
            description="SAML login finished"
          />
        </p>
        <p>
          <FormattedMessage
            defaultMessage="You might be able to get back to where you came from by using the 'forward' button."
            description="SAML login finished"
          />
        </p>
        <SAMLResponseForm mode="forward" />
      </Fragment>
    );
  }

  return (
    <Fragment>
      {/* Avoid the "logging you in" message to flash by too quick to read in normal circumstances */}
      <ShowAfterDelay delay={500}>
        <h1>
          <FormattedMessage defaultMessage="Logging you in" description="SAML login finished" />
        </h1>
        <p>
          <FormattedMessage
            defaultMessage="Please wait, you are being logged in..."
            description="SAML login finished"
          />
        </p>
      </ShowAfterDelay>
      <SAMLResponseForm mode="noscript" />
    </Fragment>
  );
}

interface SAMLResponseFormProps {
  mode: "noscript" | "retry" | "forward";
}

function SAMLResponseForm(props: SAMLResponseFormProps) {
  const SAMLParameters = useAppSelector((state) => state.login.saml_parameters);
  const targetUrl = useAppSelector((state) => state.login.post_to);
  const history = useHistory();

  function handleGoForward(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    history.goForward();
  }

  return (
    <div className="saml-login">
      <form id="saml-login-form" action={targetUrl} method="post">
        <input type="hidden" name="SAMLResponse" value={SAMLParameters?.SAMLResponse || ""} />
        <input type="hidden" name="RelayState" value={SAMLParameters?.RelayState || ""} />
        <div className="flex-buttons">
          {props.mode === "noscript" && (
            <noscript>
              <input type="submit" value="Continue" />
            </noscript>
          )}
          {props.mode === "retry" && (
            <EduIDButton buttonstyle="primary" type="submit">
              <FormattedMessage defaultMessage="Retry" description="SAML login finished" />
            </EduIDButton>
          )}
          {props.mode === "forward" && (
            <EduIDButton buttonstyle="primary" type="submit" onClick={handleGoForward}>
              <FormattedMessage defaultMessage="Forward" description="SAML login finished" />
            </EduIDButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default SubmitSamlResponse;

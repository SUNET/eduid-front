import ShowAfterDelay from "components/ShowAfterDelay";
import { useAppSelector } from "login/app_init/hooks";
import React, { Fragment, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

function SubmitSamlResponse() {
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const SAMLParameters = useAppSelector((state) => state.login.saml_parameters);
  const targetUrl = useAppSelector((state) => state.login.post_to);
  const history = useHistory();

  useEffect(() => {
    if (document.forms[0] && SAMLParameters && targetUrl) {
      setSubmitted(true);
      document.forms[0].submit();
    } else {
      setError(true);
    }
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

  useEffect(() => {
    /* If the form has already been submitted, we probably got here because the user pressed 'back'.
     * Showing a sensible message was difficult (page doesn't seem to re-render), but using a timer
     * to push the user forward again seems to work ¯\_(ツ)_/¯
     */
    const timer = setInterval(() => {
      history.goForward();
    }, 500);
    return () => clearTimeout(timer);
  }, [submitted == true]);

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

      <form action={targetUrl} method="post">
        <input type="hidden" name="SAMLResponse" value={SAMLParameters?.SAMLResponse || ""} />
        <input type="hidden" name="RelayState" value={SAMLParameters?.RelayState || ""} />
        <noscript>
          <input type="submit" value="Continue" />
        </noscript>
      </form>
    </Fragment>
  );
}

export default SubmitSamlResponse;

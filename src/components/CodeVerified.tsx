import { VerifyLinkResponseSuccess } from "apis/eduidSignup";
import EduIDButton from "components/EduIDButton";
import Splash from "components/Splash";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";

// element ids used in tests
export const idUserEmail = "user-email";
export const idUserPassword = "user-password";
export const idFinishedButton = "finished-button";

// URL parameters passed to this component
interface CodeParams {
  code?: string;
}

interface CodeVerifiedProps {
  response?: VerifyLinkResponseSuccess;
  setVerifyLinkCode: (value: string | undefined) => void;
}

export default function CodeVerified(props: CodeVerifiedProps) {
  // TODO: get dashboard URL from config instead of from backend response?
  // const dashboard_url = useSignupAppSelector((state) => state.config.dashboard_url);
  const params = useParams() as CodeParams;

  useEffect(() => {
    props.setVerifyLinkCode(params.code);
  }, [params.code]);

  return (
    <React.Fragment>
      <Splash showChildren={props.response !== undefined}>
        {props.response?.status === "verified" && <SignupComplete {...props.response} />}
      </Splash>
    </React.Fragment>
  );
}

function SignupComplete(props: VerifyLinkResponseSuccess) {
  return (
    <form method="GET" action={props.dashboard_url}>
      <h1 className="register-header">
        <FormattedMessage
          defaultMessage="You have completed the registration for eduID."
          description="Registration complete"
        />
      </h1>
      <p>
        <FormattedMessage
          defaultMessage="These are your login details for eduID."
          description="Registration finished"
        />
      </p>
      <div id="email-display">
        <fieldset>
          <label htmlFor={idUserEmail}>
            <FormattedMessage defaultMessage="Email address" description="Email label" />
          </label>
          <div className="register-header display-data">
            <output id={idUserEmail}>{props.email}</output>
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor={idUserPassword}>
            <FormattedMessage defaultMessage="Password" description="Password label" />
          </label>
          <div className="register-header registered-email display-data">
            <mark className="force-select-all">
              <output id={idUserPassword}>{props.password}</output>
            </mark>
          </div>
        </fieldset>
      </div>
      <div className="buttons">
        <EduIDButton id={idFinishedButton} buttonstyle="link" className="normal-case" type="submit">
          <FormattedMessage defaultMessage="Go to my eduid" description="go to eudID link text" />
        </EduIDButton>
      </div>
    </form>
  );
}

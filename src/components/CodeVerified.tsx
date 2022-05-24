import { fetchVerifyLink, VerifyLinkResponse, VerifyLinkResponseSuccess } from "apis/eduidSignup";
import EduIDButton from "components/EduIDButton";
import Splash from "components/Splash";
import { SIGNUP_BASE_PATH } from "../globals";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router";
import { showNotification } from "reducers/Notifications";
import { useSignupAppDispatch } from "signup-hooks";

// element ids used in tests
export const idUserEmail = "user-email";
export const idUserPassword = "user-password";
export const idFinishedButton = "finished-button";

// URL parameters passed to this component
interface CodeParams {
  code?: string;
}

interface CodeVerifiedProps {
  responseForTests?: VerifyLinkResponse;
}

export default function CodeVerified(props: CodeVerifiedProps) {
  // TODO: get dashboard URL from config instead of from backend response?
  // const dashboard_url = useSignupAppSelector((state) => state.config.dashboard_url);
  const history = useHistory();
  const params = useParams() as CodeParams;
  const [response, setResponse] = useState(props.responseForTests);

  const dispatch = useSignupAppDispatch();

  async function verifyCode(code: string) {
    const resp = await dispatch(fetchVerifyLink({ code }));

    if (fetchVerifyLink.fulfilled.match(resp)) {
      setResponse(resp.payload);
    }
  }

  useEffect(() => {
    if (!response && params?.code) {
      verifyCode(params.code);
    }
  }, []);

  useEffect(() => {
    if (response?.status === "unknown-code") {
      dispatch(showNotification({ message: "code.unknown-code", level: "info" }));
      history.push(SIGNUP_BASE_PATH + "/email"); // GOTO start
    }
  }, [response]);

  if (response?.status === "already-verified") {
    // TODO: Not sure this can reasonably actually happen in the backend?
    dispatch(showNotification({ message: "code.already-verified", level: "info" }));
  }

  return (
    <React.Fragment>
      <Splash showChildren={response !== undefined}>
        {response?.status === "verified" && <SignupComplete {...response} />}
      </Splash>
    </React.Fragment>
  );
}

function SignupComplete(props: VerifyLinkResponseSuccess) {
  return (
    <form method="GET" action={props.dashboard_url} className="vertical-content-margin content">
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
          <label>
            <FormattedMessage defaultMessage="Email address" description="Email label" />
          </label>
          <div id={idUserEmail} className="register-header display-data">
            {props.email}
          </div>
        </fieldset>
        <fieldset>
          <label>
            <FormattedMessage defaultMessage="Password" description="Password label" />
          </label>
          <div className="register-header registered-email display-data">
            <mark id={idUserPassword} className="force-select-all">
              {props.password}
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

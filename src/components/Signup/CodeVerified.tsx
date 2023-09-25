import { fetchVerifyLink, VerifyLinkResponseSuccess } from "apis/eduidSignup";
import EduIDButton from "components/Common/EduIDButton";
import Splash from "components/Common/Splash";
import { SIGNUP_BASE_PATH } from "components/IndexMain";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { showNotification } from "slices/Notifications";
import { idUserEmail } from "./SignupUserCreated";
// element ids used in tests
export const idUserPassword = "user-password";
export const idFinishedButton = "finished-button";

// URL parameters passed to this component
interface CodeParams {
  code?: string;
}

export default function CodeVerified() {
  // TODO: get dashboard URL from config instead of from backend response?
  // const dashboard_url = useSignupAppSelector((state) => state.config.dashboard_url);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams() as CodeParams;
  const response = useAppSelector((state) => state.signup.verify_link_response);

  useEffect(() => {
    if (!response && params?.code) {
      dispatch(fetchVerifyLink({ code: params.code }));
    }
  }, []);

  useEffect(() => {
    if (response?.status === "unknown-code") {
      dispatch(showNotification({ message: "code.unknown-code", level: "info" }));
      navigate(SIGNUP_BASE_PATH + "/email"); // GOTO start
    }
    if (response?.status === "already-verified") {
      // TODO: Not sure this can reasonably actually happen in the backend?
      dispatch(showNotification({ message: "code.already-verified", level: "info" }));
      navigate(SIGNUP_BASE_PATH + "/email"); // GOTO start
    }
  }, [response]);

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
    <form method="GET" action={props.dashboard_url}>
      <h1>
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

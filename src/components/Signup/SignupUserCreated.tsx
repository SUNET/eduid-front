import { createUserRequest } from "apis/eduidSignup";
import EduIDButton from "components/EduIDButton";
import { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import { SignupGlobalStateContext } from "./SignupGlobalState";

// element ids used in tests
export const idUserEmail = "user-email";
export const idUserPassword = "user-password";
export const idFinishedButton = "finished-button";

export function CreateUser() {
  const dispatch = useSignupAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);

  async function createUser() {
    const res = await dispatch(createUserRequest({ use_password: true }));

    if (createUserRequest.fulfilled.match(res)) {
      signupContext.signupService.send({ type: "API_SUCCESS" });
    } else {
      signupContext.signupService.send({ type: "API_FAIL" });
    }
  }

  useEffect(() => {
    createUser();
  }, []);

  return null;
}

export function SignupUserCreated(): JSX.Element {
  const signupState = useSignupAppSelector((state) => state.signup.state);
  const dashboard_url = useSignupAppSelector((state) => state.config.dashboard_url);

  return (
    <form method="GET" action={dashboard_url}>
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
            <output id={idUserEmail}>{signupState?.email.address}</output>
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor={idUserPassword}>
            <FormattedMessage defaultMessage="Password" description="Password label" />
          </label>
          <div className="register-header registered-email display-data">
            <mark className="force-select-all">
              <output id={idUserPassword}>{format_password(signupState?.credentials.password)}</output>
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

// Show passwords in groups of four characters.
// Export this for use in tests.
export function format_password(data?: string): string {
  if (!data) {
    return "";
  }
  const res = data.match(/.{1,4}/g);
  if (res) {
    return res.join(" ");
  }
  return "";
}

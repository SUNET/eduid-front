import { createUserRequest } from "apis/eduidSignup";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { SignupGlobalStateContext } from "./SignupGlobalState";

// element ids used in tests
export const idUserEmail = "user-email";
export const idUserPassword = "user-password";
export const idFinishedButton = "finished-button";

export function CreateUser() {
  const dispatch = useAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);

  async function createUser() {
    const res = await dispatch(createUserRequest({ use_password: true }));

    if (createUserRequest.fulfilled.match(res)) {
      dispatch(clearNotifications());
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
  const signupState = useAppSelector((state) => state.signup.state);
  const dashboard_url = useAppSelector((state) => state.config.dashboard_link);

  return (
    <form method="GET" action={dashboard_url}>
      <h1>
        <FormattedMessage
          defaultMessage="You have completed the registration for eduID."
          description="Registration complete"
        />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage={`These are your login details for eduID. A password has been generated for you. 
              Save the password! Note: spaces in the generated password are there for legibility and will be removed automatically if entered. Once you've logged in it is possible to change your password.`}
            description="Registration finished"
          />
        </p>
      </div>
      <div id="email-display">
        <fieldset>
          <label htmlFor={idUserEmail}>
            <FormattedMessage defaultMessage="Email address" description="Email label" />
          </label>
          <div className="display-data">
            <output id={idUserEmail}>{signupState?.email.address}</output>
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor={idUserPassword}>
            <FormattedMessage defaultMessage="Password" description="Password label" />
          </label>
          <div className="display-data">
            <mark className="force-select-all">
              <output id={idUserPassword}>{formatPassword(signupState?.credentials.password)}</output>
            </mark>
          </div>
        </fieldset>
        {/* Hidden elements for password managers */}
        <input className="display-none" type="text" autoComplete="username" defaultValue={signupState?.email.address} />
        <input
          className="display-none"
          type="password"
          autoComplete="new-password"
          defaultValue={formatPassword(signupState?.credentials.password)}
        />
      </div>
      <div className="buttons">
        <EduIDButton id={idFinishedButton} buttonstyle="link" className="normal-case" type="submit">
          <FormattedMessage defaultMessage="Go to eduid to login" description="go to eudID link text" />
        </EduIDButton>
      </div>
    </form>
  );
}

// Show passwords in groups of four characters.
// Export this for use in tests.
export function formatPassword(data?: string): string {
  if (!data) {
    return "";
  }
  const res = data.match(/.{1,4}/g);
  if (res) {
    return res.join(" ");
  }
  return "";
}

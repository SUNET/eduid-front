import { useActor } from "@xstate/react";
import { requestEmailLink } from "apis/eduidResetPassword";
import EduIDButton from "components/EduIDButton";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import loginSlice from "login/redux/slices/loginSlice";
import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { clearNotifications } from "reducers/Notifications";
import { EmailLinkSent } from "./EmailLinkSent";
import { GoBackButton } from "./GoBackButton";
import { ResetPasswordEnterEmail } from "./ResetPasswordEnterEmail";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

// URL parameters passed to ResetPasswordRequestEmail
export interface UrlParams {
  ref?: string;
}

export function ResetPasswordRequestEmail(): JSX.Element {
  const params = useParams() as UrlParams;
  const dispatch = useAppDispatch();
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const email_status = useAppSelector((state) => state.resetPassword.email_status); // Has an e-mail been sent?
  const loginRef = useAppSelector((state) => state.login.ref);

  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const [state] = useActor(resetPasswordContext.resetPasswordService);

  useEffect(() => {
    if (loginRef === undefined && params.ref !== undefined) {
      // If the user reloads the page, we restore state.login.ref with the login ref we still have as a URL parameter
      dispatch(loginSlice.actions.addLoginRef({ ref: params.ref, start_url: window.location.href }));
    }
  }, [loginRef, params]);

  useEffect(() => {
    if (!email_status && email_address) {
      console.log("COMPLETE");
      resetPasswordContext.resetPasswordService.send({ type: "COMPLETE" });
      // return <ResetPasswordConfirmEmail />;
    } else resetPasswordContext.resetPasswordService.send({ type: "BYPASS" });
  }, [email_status, email_address]);

  return (
    // <Splash showChildren={email_status !== "requested"}>
    //   {email_status === "success" && <EmailLinkSent />}
    //   {email_status === "failed" && <ResetPasswordEnterEmail />}
    // </Splash>
    <React.Fragment>
      {state.matches("ResetPasswordStart") && <ResetPasswordStart />}
      {state.matches("AskForEmailOrConfirmEmail.ResetPasswordRequestEmail") && <ResetPasswordRequestEmail />}
      {state.matches("AskForEmailOrConfirmEmail.ResetPasswordConfirmEmail") && <ResetPasswordConfirmEmail />}
      {state.matches("AskForEmailOrConfirmEmail.ResetPasswordEnterEmail") && <ResetPasswordEnterEmail />}
      {state.matches("AskForEmailOrConfirmEmail.EmailLinkSent") && <EmailLinkSent />}
    </React.Fragment>
  );
}

/**
 * ResetPassword state to determine what kind of signup this is, and what to do next.
 */
function ResetPasswordStart(): null {
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  resetPasswordContext.resetPasswordService.send({ type: "COMPLETE" });

  return null;
}

/**
 *
 * When we get an e-mail address from the login username page, this page asks the user for
 * confirmation before requesting the backend to send an actual e-mail to the user.
 */
export function ResetPasswordConfirmEmail(): JSX.Element {
  const dispatch = useAppDispatch();
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  console.log("ResetPasswordConfirmEmail", ResetPasswordConfirmEmail);

  async function sendEmailOnClick() {
    dispatch(clearNotifications());
    if (email_address) {
      const response = await dispatch(requestEmailLink({ email: email_address }));
      if (requestEmailLink.fulfilled.match(response)) {
        resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
      } else {
        resetPasswordContext.resetPasswordService.send({ type: "API_FAIL" });
      }
    }
  }

  return (
    <React.Fragment>
      <p>
        <FormattedMessage
          defaultMessage="To start the account recovery process, press the button below to send an e-mail to {email}."
          description="Account recovery front page"
          values={{
            email: (
              <span id="email_address">
                <output data-testid="email-address">
                  <strong>{email_address}</strong>
                </output>
              </span>
            ),
          }}
        />
      </p>

      <div className="buttons">
        <GoBackButton />
        <EduIDButton buttonstyle="primary" type="submit" onClick={sendEmailOnClick}>
          <FormattedMessage defaultMessage="Send e-mail" description="Send e-mail button" />
        </EduIDButton>
      </div>
    </React.Fragment>
  );
}

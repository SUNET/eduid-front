import { ExtraSecurityTokens } from "apis/eduidResetPassword";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import EduIDButton from "../../../../components/EduIDButton";
import { clearNotifications } from "../../../../reducers/Notifications";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import { performAuthentication } from "../../../app_utils/helperFunctions/navigatorCredential";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

interface SecurityKeyProps {
  selected_option?: string;
  extraSecurityKey?: ExtraSecurityTokens;
  ShowSecurityKey: React.MouseEventHandler<HTMLButtonElement>;
}

export function SecurityKey({
  selected_option,
  extraSecurityKey,
  ShowSecurityKey,
}: SecurityKeyProps): JSX.Element | null {
  if (extraSecurityKey === undefined || !Object.keys(extraSecurityKey)) {
    return null;
  }
  return (
    <React.Fragment>
      {!selected_option ? (
        <React.Fragment>
          {Object.values(extraSecurityKey).map((security, index) => {
            console.log("security", security);
            return (
              <React.Fragment key={index}>
                {
                  <div className="buttons">
                    <EduIDButton buttonstyle="primary" id="extra-security-key" key={index} onClick={ShowSecurityKey}>
                      <FormattedMessage description="mfa primary option" defaultMessage="Use security key" />
                    </EduIDButton>
                  </div>
                }
              </React.Fragment>
            );
          })}
        </React.Fragment>
      ) : selected_option === "securityKey" ? (
        <SelectedSecurityToken />
      ) : null}
    </React.Fragment>
  );
}

export function SelectedSecurityToken(): JSX.Element {
  const dispatch = useAppDispatch();
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const [assertion, setAssertion] = useState(webauthn_assertion);
  const webauthn_challenge = useAppSelector((state) => state.resetPassword?.extra_security?.tokens?.webauthn_options);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  useEffect(() => {
    if (webauthn_assertion) setAssertion(webauthn_assertion);
    if (assertion) resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
  }, [webauthn_assertion, assertion]);

  function retryTokenAssertion() {
    if (webauthn_challenge === undefined) {
      return undefined;
    } else {
      if (webauthn_assertion === undefined) {
        dispatch(performAuthentication(webauthn_challenge));
      }
    }
  }

  function continueSetPassword() {
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("without"));
    dispatch(clearNotifications());
    resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
  }

  return (
    <React.Fragment>
      <p>
        <FormattedMessage
          description="mfa reset-password tapit"
          defaultMessage="Use your security key to reset password. If it has a button, tap it."
        />
      </p>
      <figure>
        <div className="key-animation" />
        <div>
          <form method="POST" action="#" id="form" className="form-inline">
            <div id="tou-form-buttons" className="form-group">
              <div className="input-group" />
            </div>
            <input type="hidden" name="tokenResponse" id="tokenResponse" />
          </form>
        </div>

        <div id="mfa-try-another-way">
          <figcaption>
            <FormattedMessage description="mfa problems heading" defaultMessage="Problems?" />
          </figcaption>
          <button id="try-token-assertion" className="btn-link" onClick={() => retryTokenAssertion()}>
            <FormattedMessage description="mfa try again" defaultMessage="Try again" />
          </button>
        </div>
      </figure>
      <h4 className="description-without-security">
        <FormattedMessage
          description="without extra security heading"
          defaultMessage="Continue without extra security option"
        />
      </h4>
      <p>
        <FormattedMessage
          description="without extra security description"
          defaultMessage="Your account will require confirmation after the password has been reset."
        />
        &nbsp;
        <a className="text-link" id="continue-without-security" onClick={continueSetPassword}>
          <FormattedMessage description="continue reset password" defaultMessage="Continue reset password" />
        </a>
      </p>
    </React.Fragment>
  );
}

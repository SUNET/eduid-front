import { translate } from "login/translation";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import EduIDButton from "../../../../components/EduIDButton";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import { performAuthentication } from "../../../app_utils/helperFunctions/navigatorCredential";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

interface SecurityKeyProps {
  selected_option?: string;
  extraSecurityKey?: any;
  ShowSecurityKey: React.MouseEventHandler<HTMLButtonElement>;
}

export function SecurityKey({
  selected_option,
  extraSecurityKey,
  ShowSecurityKey,
}: SecurityKeyProps): JSX.Element | null {
  if (!Object.keys(extraSecurityKey)) {
    return null;
  }
  return (
    <React.Fragment>
      {!selected_option ? (
        <React.Fragment>
          {Object.values(extraSecurityKey).map((security, index) => {
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
        <ExtraSecurityToken />
      ) : null}
    </React.Fragment>
  );
}

export function ExtraSecurityToken(): JSX.Element {
  const dispatch = useAppDispatch();
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const [assertion, setAssertion] = useState(webauthn_assertion);
  const webauthn_challenge = useAppSelector((state) => state.resetPassword?.extra_security?.tokens?.webauthn_options);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  const retryTokenAssertion = () => {
    if (webauthn_challenge === undefined) {
      return undefined;
    } else {
      if (webauthn_assertion === undefined) {
        dispatch(performAuthentication(webauthn_challenge));
      }
    }
  };

  useEffect(() => {
    if (webauthn_assertion) setAssertion(webauthn_assertion);
    if (assertion) resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
  }, [webauthn_assertion, assertion]);

  return (
    <React.Fragment>
      <p>{translate("mfa.reset-password-tapit")}</p>
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
          <figcaption>{translate("mfa.problems-heading")}</figcaption>

          <button id="try-token-assertion" className="btn-link" onClick={() => retryTokenAssertion()}>
            {translate("mfa.try-again")}
          </button>
        </div>
      </figure>
    </React.Fragment>
  );
}

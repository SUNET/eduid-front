import { translate } from "login/translation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import { performAuthentication } from "../../../app_utils/helperFunctions/navigatorCredential";

export function ExtraSecurityToken(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const [assertion, setAssertion] = useState(webauthn_assertion);
  const webauthn_challenge = useAppSelector(
    (state) => state.resetPassword.extra_security && state.resetPassword.extra_security.tokens.webauthn_options
  );

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
    if (assertion) navigate("/reset-password/set-new-password");
  }, [webauthn_assertion, assertion]);

  return (
    <>
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
    </>
  );
}

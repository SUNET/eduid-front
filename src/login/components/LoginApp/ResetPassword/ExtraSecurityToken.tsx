import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import { performAuthentication } from "../../../app_utils/helperFunctions/navigatorCredential";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

interface ExtraSecurityTokenProps {
  translate(msg: string): string;
  webauthn_challenge: string;
}

const ExtraSecurityToken = (props: ExtraSecurityTokenProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const emailCode = useAppSelector((state) => state.resetPassword.email_code);
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
    if (assertion) navigate(`/reset-password/set-new-password/${emailCode}`);
  }, [webauthn_assertion, assertion]);

  return (
    <>
      <p>{props.translate("mfa.reset-password-tapit")}</p>
      <div className="key-animation" />
      <div>
        <form method="POST" action="#" id="form" className="form-inline">
          <div id="tou-form-buttons" className="form-group">
            <div className="input-group" />
          </div>
          <input type="hidden" name="tokenResponse" id="tokenResponse" />
        </form>
      </div>
      <div className="text-center">
        <div className="card" id="mfa-try-another-way">
          <div className="card-header">{props.translate("mfa.problems-heading")}</div>
          <div className="card-body">
            <button id="try-token-assertion" className="btn-link" onClick={() => retryTokenAssertion()}>
              {props.translate("mfa.try-again")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

ExtraSecurityToken.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default InjectIntl(ExtraSecurityToken);

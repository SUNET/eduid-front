import React from "react";
import InjectIntl  from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { assertionFromAuthenticator } from "../../../app_utils/helperFunctions/authenticatorAssertion";

const ExtraSecurityToken = (props) => {
  const dispatch = useDispatch();
  const webauthn_challenge = useSelector(
    (state) => state.resetPassword.extra_security && state.resetPassword.extra_security.tokens.webauthn_options
  );

  const retryTokenAssertion = () => {
    assertionFromAuthenticator(webauthn_challenge, dispatch);
  };

  return (
    <> 
      <p>{props.translate("mfa.reset-password-tapit")}</p>
      <div className="key-animation"  />
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
          <div className="card-header">
            {props.translate("mfa.problems-heading")}
          </div>
          <div className="card-body">
            <button 
              className="btn-link" 
              onClick={()=>retryTokenAssertion()}>
              {props.translate("mfa.try-again")}
            </button>
            <button className="btn-link">
              {props.translate("mfa.freja-eid")}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

ExtraSecurityToken.propTypes = {
  translate: PropTypes.func.isRequired
};

export default InjectIntl(ExtraSecurityToken);
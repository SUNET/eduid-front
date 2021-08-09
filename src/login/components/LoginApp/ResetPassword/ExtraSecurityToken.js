import React, { useEffect } from "react";
import InjectIntl  from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getWebauthnAssertion, cancelWebauthnAssertion } from "../../../redux/actions/getWebauthnAssertionActions";

const assertionFromAuthenticator = async (
  webauthn_challenge,
  dispatch
) => {
  const webauthnAssertion = await navigator.credentials
    .get(webauthn_challenge)
    .then()
    .catch(() => {
      dispatch(cancelWebauthnAssertion())
    });
  if(webauthnAssertion !== undefined) {
    dispatch(getWebauthnAssertion(webauthnAssertion));
  }
};

const ExtraSecurityToken = (props) => {
  const dispatch = useDispatch();
  const webauthn_challenge = useSelector(
    (state) => extra_security && state.resetPassword.extra_security.tokens.webauthn_options
  );
  const webauthn_assertion = useSelector(
    (state) => state.resetPassword.webauthn_assertion
  );

  useEffect(() => { 
    if (!webauthn_assertion && webauthn_assertion !== undefined) {
      assertionFromAuthenticator(webauthn_challenge, dispatch);
    } 
  }, [webauthn_challenge, webauthn_assertion]);

  const retryTokenAssertion = () => {
    assertionFromAuthenticator(webauthn_challenge, dispatch);
  }

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
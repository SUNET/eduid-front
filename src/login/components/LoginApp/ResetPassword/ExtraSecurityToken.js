import React, { useEffect } from "react";
import InjectIntl  from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { addTokenAssertion } from "../../../redux/actions/postResetPasswordActions";

const assertionFromAuthenticator = async (
  webauthn_challenge,
  dispatch,
  setShowSecurityToken,
  showSecurityToken
) => {
  console.log("[1 webauthn_challenge]", webauthn_challenge)
  const webauthnAssertion = await navigator.credentials
    .get(webauthn_challenge)
    .then()
    .catch(() => {
      setShowSecurityToken(false)
      // getting assertion failed
      // dispatch(removeSecurityOption());
    });
  if (webauthnAssertion !== undefined || !webauthnAssertion && !showSecurityToken) {
    
    return dispatch(addTokenAssertion(webauthnAssertion)),
    console.log("[2 webauthnAssertion]", webauthnAssertion)
  }
};


const ExtraSecurityToken = (props) => {
  const dispatch = useDispatch();
  const webauthn_challenge = useSelector(
    (state) => state.resetPassword.extra_security.tokens.webauthn_options
  );
  const selected_option = useSelector(
    (state) => state.resetPassword.selected_option
  );
  const setShowSecurityToken = props.setShowSecurityToken;
  const showSecurityToken = props.showSecurityToken;

  useEffect(() => {
    if (webauthn_challenge) {
      
      if (!selected_option) {
        assertionFromAuthenticator(webauthn_challenge, dispatch);
      } 
    }
  }, [webauthn_challenge, selected_option, setShowSecurityToken]);

  return (
    showSecurityToken && 
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
            <button className="btn-link">
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
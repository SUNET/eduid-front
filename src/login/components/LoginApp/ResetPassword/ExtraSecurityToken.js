import React, { useEffect } from "react";
import InjectIntl  from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import ResetPasswordLayout from "./ResetPasswordLayout";
import { addTokenAssertion, cancleTokenAssertion } from "../../../redux/actions/postResetPasswordActions";

const assertionFromAuthenticator = async (
  webauthn_challenge,
  dispatch
) => {
  const webauthnAssertion = await navigator.credentials
    .get(webauthn_challenge)
    .then()
    .catch(() => {
      dispatch(cancleTokenAssertion())
    });
  if(webauthnAssertion !== undefined) {
    dispatch(addTokenAssertion(webauthnAssertion));
  }
};

const ExtraSecurityToken = (props) => {
  const dispatch = useDispatch();
  const webauthn_challenge = useSelector(
    (state) => state.resetPassword.extra_security.tokens.webauthn_options
  );
  const token_assertion = useSelector(
    (state) => state.resetPassword.token_assertion
  );

  useEffect(() => {
    if(webauthn_challenge === null) {
      history.push(`/reset-password/`)
    } else {  
      if (!token_assertion && token_assertion !== undefined) {
        assertionFromAuthenticator(webauthn_challenge, dispatch);
      } 
    }
  }, [webauthn_challenge, token_assertion]);

  const retryTokenAssertion = () => {
    assertionFromAuthenticator(webauthn_challenge, dispatch);
  }

  return (
    <ResetPasswordLayout
       heading={props.translate("resetpw.extra-security_heading")} 
       description={props.translate("resetpw.extra-security_description")} 
       linkInfoText={props.translate("resetpw.without_extra_security")}
       linkText={props.translate("resetpw.continue_reset_password")}
     > 
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
      </ResetPasswordLayout>
  )
}

ExtraSecurityToken.propTypes = {
  translate: PropTypes.func.isRequired
};

export default InjectIntl(ExtraSecurityToken);
import React, { useEffect } from "react";
import InjectIntl  from "../../../translation/InjectIntl_HOC_factory";
import ResetPasswordLayout from "./ResetPasswordLayout";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { removeSecurityOption, addTokenAssertion } from "../../../redux/actions/postResetPasswordActions";

const assertionFromAuthenticator = async (
  webauthn_challenge,
  dispatch
) => {
  console.log("[1 webauthn_challenge]", webauthn_challenge)
  const webauthnAssertion = await navigator.credentials
    .get(webauthn_challenge)
    .then()
    .catch(() => {
      // getting assertion failed
      // dispatch(removeSecurityOption());
    });
  if (webauthnAssertion !== undefined || !webauthnAssertion) {
    dispatch(addTokenAssertion(webauthnAssertion));
    console.log("[2 webauthnAssertion ]", webauthnAssertion )
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

  useEffect(() => {
    if (webauthn_challenge === null || webauthn_challenge === undefined) {
      return undefined;
    } else {
      if (!selected_option) {
        assertionFromAuthenticator(webauthn_challenge, dispatch);
      } else {
        dispatch(addTokenAssertion(selected_option.webauthn_assertion));
      }
    }
  }, [webauthn_challenge, selected_option]);

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
            <button className="btn-link">
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
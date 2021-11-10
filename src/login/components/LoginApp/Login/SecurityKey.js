import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faTimes } from "@fortawesome/free-solid-svg-icons";
import SecurityKeyGif from "../../../../../img/computer_animation.gif";
import loginSlice from "../../../redux/slices/loginSlice";
import { eduidRMAllNotify } from "../../../../actions/Notifications";
import {
  mfaDecodeMiddleware,
  safeEncode,
} from "../../../app_utils/helperFunctions/authenticatorAssertion";

const assertionFromAuthenticator = async (
  webauthn_challenge,
  dispatch,
  setSelected
) => {
  const decoded_challenge = mfaDecodeMiddleware(webauthn_challenge);
  const credential = await navigator.credentials
    .get(decoded_challenge)
    .then()
    .catch(() => {
      // getting assertion failed
      setSelected(false);
    });
  if (credential !== undefined) {
    // webauthnAssertion is of type PublicKeyCredential
    const encoded_response = {
      credentialId: safeEncode(credential.rawId),
      authenticatorData: safeEncode(credential.response.authenticatorData),
      clientDataJSON: safeEncode(credential.response.clientDataJSON),
      signature: safeEncode(credential.response.signature),
    };
    dispatch(loginSlice.actions.addWebauthnAssertion(encoded_response));
  }
};

let CloseButton = ({ setSelected }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="icon"
      onClick={() => {
        setSelected(false);
        dispatch(eduidRMAllNotify());
      }}
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
};

let RetryButton = ({ retryToggle, setRetryToggle }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="icon"
      onClick={() => {
        setRetryToggle(!retryToggle);
        dispatch(eduidRMAllNotify());
      }}
    >
      <FontAwesomeIcon icon={faRedo} />
    </button>
  );
};

let SecurityKeyUnselected = ({ translate, setSelected }) => {
  const webauthn_challenge = useSelector(
    (state) => state.login.mfa.webauthn_challenge
  );
  const webauthn_assertion = useSelector(
    (state) => state.login.mfa.webauthn_assertion
  );
  const dispatch = useDispatch();
  const ShowSecurityKey = (e) => {
    e.preventDefault();
    startTokenAssertion(setSelected);
  };

  const startTokenAssertion = (setSelected) => {
    setSelected(true);
    if (webauthn_challenge === undefined) {
      // HACK: skip func if no webauthn_challenge
      return undefined;
    } else {
      if (webauthn_assertion === undefined) {
        assertionFromAuthenticator(webauthn_challenge, dispatch, setSelected);
      }
    }
  };

  return (
    <Fragment>
      <p className="heading">{translate("login.mfa.primary-option.title")}</p>
      <ButtonPrimary
        type="submit"
        onClick={ShowSecurityKey}
        id="mfa-security-key"
      >
        {translate("login.mfa.primary-option.button")}
      </ButtonPrimary>
    </Fragment>
  );
};

let SecurityKey = (props) => {
  const { translate } = props;
  const [selected, setSelected] = useState(false);
  const [retryToggle, setRetryToggle] = useState(false);
  return (
    <div className="primary" tabIndex="0">
      <div className="option">
        {selected ? (
          <>
            <div className="button-pair selected">
              <p className="heading">
                {translate("login.mfa.primary-option.title")}
              </p>
              <CloseButton setSelected={setSelected} />
            </div>
            <div className="button-pair bottom">
              <img
                src={SecurityKeyGif}
                alt="animation of security key inserted into computer"
              />
              <RetryButton
                retryToggle={retryToggle}
                setRetryToggle={setRetryToggle}
              />
            </div>
          </>
        ) : (
          <SecurityKeyUnselected setSelected={setSelected} {...props} />
        )}
      </div>
      {selected && (
        <p className="help-link">
          {translate("login.mfa.primary-option.hint")}
        </p>
      )}
    </div>
  );
};

SecurityKey.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(SecurityKey);

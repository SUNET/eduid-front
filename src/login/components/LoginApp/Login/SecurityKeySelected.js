import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faTimes } from "@fortawesome/free-solid-svg-icons";
import SecurityKeyGif from "../../../../../img/computer_animation.gif";
import { addWebauthnAssertion } from "../../../redux/actions/addDataToStoreActions";
import { postWebauthnFromAuthenticator } from "../../../redux/actions/postWebauthnFromAuthenticatorActions";
import { eduidRMAllNotify } from "../../../../actions/Notifications";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

// use challenge on authenticator to get assertion
const getCredentialsFromAuthenticator = async (
  webauthn_challenge,
  dispatch
) => {
  const webauthnAssertion = await navigator.credentials
    .get(webauthn_challenge)
    .then()
    .catch((error) => {
      console.log("Problem getting MFA credentials:", error);
    });
  if (webauthnAssertion !== undefined) {
    dispatch(addWebauthnAssertion(webauthnAssertion));
  }
};
// post assertion to backend for verification
const postAuthenticatorAssertion = (webauthn_assertion, dispatch) => {
  dispatch(postWebauthnFromAuthenticator(webauthn_assertion));
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

let SecurityKeySelected = ({ translate, setSelected }) => {
  const [retryToggle, setRetryToggle] = useState(false);
  const dispatch = useDispatch();
  const webauthn_challenge = useSelector(
    (state) => state.login.mfa.webauthn_challenge
  );
  const webauthn_assertion = useSelector(
    (state) => state.login.mfa.webauthn_assertion
  );
  useEffect(() => {
    const securityKeyAssertion = () => {
      if (webauthn_challenge === null && webauthn_assertion === undefined) {
        // both challenge and assertion failed
        dispatch(postWebauthnFromAuthenticatorFail("error"));
      } else if (webauthn_challenge !== null && webauthn_assertion === null) {
        getCredentialsFromAuthenticator(webauthn_challenge, dispatch);
      } else if (webauthn_assertion === undefined) {
        // assertion failed
        setSelected(false);
      } else {
        postAuthenticatorAssertion(webauthn_assertion, dispatch);
      }
    };
    // HACK: skip func if no challenge (returning to mfa page after failing freja)
    if (webauthn_challenge === null && webauthn_assertion === null) {
      console.log(
        "webauthn_challenge is still null, do nothing while response arrives from backend"
      );
    } else {
      securityKeyAssertion();
    }
  }, [webauthn_challenge, webauthn_assertion, retryToggle]);

  return (
    <Fragment>
      <div className="button-pair selected">
        <p className="heading">{translate("login.mfa.primary-option.title")}</p>
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
    </Fragment>
  );
};

SecurityKeySelected.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(SecurityKeySelected);

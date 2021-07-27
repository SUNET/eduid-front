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

const assertionFromAuthenticator = async (
  webauthn_challenge,
  dispatch,
  setSelected
) => {
  const webauthnAssertion = await navigator.credentials
    .get(webauthn_challenge)
    .then()
    .catch(() => {
      // getting assertion failed
      setSelected(false);
    });
  if (webauthnAssertion !== undefined) {
    dispatch(addWebauthnAssertion(webauthnAssertion));
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
    if (webauthn_challenge === null) {
      // HACK: skip func if no webauthn_challenge
      return undefined;
    } else {
      if (webauthn_assertion === null) {
        assertionFromAuthenticator(webauthn_challenge, dispatch, setSelected);
      } else {
        dispatch(postWebauthnFromAuthenticator(webauthn_assertion));
      }
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

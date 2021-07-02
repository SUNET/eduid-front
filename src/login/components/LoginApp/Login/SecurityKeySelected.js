import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faTimes } from "@fortawesome/free-solid-svg-icons";
import SecurityKeyGif from "../../../../../img/computer_animation.gif";
import { postWebauthnFromAuthenticator } from "../../../redux/actions/postWebauthnFromAuthenticatorActions";
import { eduidRMAllNotify } from "../../../../actions/Notifications";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

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

  useEffect(() => {
    async function securityKeyAssertion() {
      const webauthnAssertion = await navigator.credentials
        .get(webauthn_challenge)
        .then()
        .catch((error) => {
          console.log("Problem getting MFA credentials:", error);
        });
      dispatch(postWebauthnFromAuthenticator(webauthnAssertion));
    }
    securityKeyAssertion();
  }, [retryToggle]);

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

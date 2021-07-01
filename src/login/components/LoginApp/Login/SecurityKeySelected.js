import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faTimes } from "@fortawesome/free-solid-svg-icons";
import SecurityKeyGif from "../../../../../img/computer_animation.gif";
import { postWebauthnToAuthenticator } from "../../../redux/actions/postWebauthnToAuthenticatorActions";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let SecurityKeySelected = ({ translate, setSelected }) => {
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
      dispatch(postWebauthnToAuthenticator(webauthnAssertion));
    }
    securityKeyAssertion();
  }, []);

  return (
    <Fragment>
      <div className="button-pair selected">
        <p className="heading">{translate("login.mfa.primary-option.title")}</p>
        <button
          className="icon"
          onClick={() => {
            setSelected(false);
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="button-pair bottom">
        <img
          src={SecurityKeyGif}
          alt="animation of security key inserted into computer"
        />
        <button className="icon" onClick={() => {}}>
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
    </Fragment>
  );
};

SecurityKeySelected.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(SecurityKeySelected);

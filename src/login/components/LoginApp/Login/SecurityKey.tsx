import React, { Fragment, useState } from "react";
import EduIDButton from "../../../../components/EduIDButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faTimes } from "@fortawesome/free-solid-svg-icons";
import SecurityKeyGif from "../../../../../img/computer_animation.gif";
import { clearNotifications } from "../../../../reducers/Notifications";
import { performAuthentication } from "../../../app_utils/helperFunctions/navigatorCredential";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FormattedMessage } from "react-intl";

interface CloseButtonProps {
  setSelected(val: boolean): void;
}

function CloseButton({ setSelected }: CloseButtonProps): JSX.Element {
  const faTimesCasted = faTimes as IconProp;
  const dispatch = useAppDispatch();
  return (
    <button
      className="icon"
      onClick={() => {
        setSelected(false);
        dispatch(clearNotifications());
      }}
    >
      <FontAwesomeIcon icon={faTimesCasted} />
    </button>
  );
}

interface RetryButtonProps {
  retryToggle: boolean;
  setRetryToggle(val: boolean): void;
}

function RetryButton({ retryToggle, setRetryToggle }: RetryButtonProps): JSX.Element {
  const faRedoCasted = faRedo as IconProp;
  const dispatch = useAppDispatch();
  return (
    <button
      className="icon"
      onClick={() => {
        setRetryToggle(!retryToggle);
        dispatch(clearNotifications());
      }}
    >
      <FontAwesomeIcon icon={faRedoCasted} />
    </button>
  );
}

interface SecurityKeyUnselectedProps {
  setSelected(val: boolean): void;
}

function SecurityKeyUnselected({ setSelected }: SecurityKeyUnselectedProps): JSX.Element {
  const webauthn_challenge = useAppSelector((state) => state.login.mfa.webauthn_challenge);
  const webauthn_assertion = useAppSelector((state) => state.login.mfa.webauthn_assertion);
  const dispatch = useAppDispatch();
  const showSecurityKey = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    startTokenAssertion(setSelected);
  };

  function startTokenAssertion(setSelected: (val: boolean) => void) {
    setSelected(true);
    if (webauthn_challenge === undefined) {
      // HACK: skip func if no webauthn_challenge
      return undefined;
    } else {
      if (webauthn_assertion === undefined) {
        dispatch(performAuthentication(webauthn_challenge)).then((ret) => {
          if (ret.payload === undefined) {
            setSelected(false);
          }
        });
      }
    }
  }

  return (
    <Fragment>
      <h4>
        <FormattedMessage
          description="login this device, security key button"
          defaultMessage={`This Device / Security key`}
        />
      </h4>
      <p className="help-text">
        <FormattedMessage
          description="platform authn help text"
          defaultMessage={`E.g. USB Security Key, Touch ID or Face ID`}
        />
      </p>
      <EduIDButton buttonstyle="primary" type="submit" onClick={showSecurityKey} id="mfa-security-key">
        <FormattedMessage description="login mfa primary option button" defaultMessage={`Use security key`} />
      </EduIDButton>
    </Fragment>
  );
}

export function SecurityKey(): JSX.Element {
  const [selected, setSelected] = useState(false);
  const [retryToggle, setRetryToggle] = useState(false);
  return (
    <div className="option-wrapper">
      <div className="option">
        {selected ? (
          <>
            <div className="button-pair selected">
              <h4>
                <FormattedMessage
                  description="login this device, security key button"
                  defaultMessage={`This Device / Security key`}
                />
              </h4>
              <CloseButton setSelected={setSelected} />
            </div>
            <div className="button-pair bottom">
              <img src={SecurityKeyGif} alt="animation of security key inserted into computer" />
              <RetryButton retryToggle={retryToggle} setRetryToggle={setRetryToggle} />
            </div>
          </>
        ) : (
          <SecurityKeyUnselected setSelected={setSelected} />
        )}
      </div>
      {selected && (
        <p className="help-text">
          <FormattedMessage
            description="login mfa primary option hint"
            defaultMessage={`If your security key has a button, don’t forget to tap it.`}
          />
        </p>
      )}
    </div>
  );
}

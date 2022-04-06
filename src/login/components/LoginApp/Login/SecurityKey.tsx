import React, { Fragment, useState } from "react";
import EduIDButton from "../../../../components/EduIDButton";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faTimes } from "@fortawesome/free-solid-svg-icons";
import SecurityKeyGif from "../../../../../img/computer_animation.gif";
import { clearNotifications } from "../../../../reducers/Notifications";
import { performAuthentication } from "../../../app_utils/helperFunctions/navigatorCredential";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface CloseButtonProps {
  setSelected(val: boolean): void;
}

const CloseButton = ({ setSelected }: CloseButtonProps): JSX.Element => {
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
};

interface RetryButtonProps {
  retryToggle: boolean;
  setRetryToggle(val: boolean): void;
}

const RetryButton = ({ retryToggle, setRetryToggle }: RetryButtonProps): JSX.Element => {
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
};

interface SecurityKeyUnselectedProps extends SecurityKeyProps {
  setSelected(val: boolean): void;
}

const SecurityKeyUnselected = ({ translate, setSelected }: SecurityKeyUnselectedProps): JSX.Element => {
  const webauthn_challenge = useAppSelector((state) => state.login.mfa.webauthn_challenge);
  const webauthn_assertion = useAppSelector((state) => state.login.mfa.webauthn_assertion);
  const dispatch = useAppDispatch();
  const showSecurityKey = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    startTokenAssertion(setSelected);
  };

  const startTokenAssertion = (setSelected: (val: boolean) => void) => {
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
  };

  return (
    <Fragment>
      <p className="heading">{translate("login.mfa.primary-option.title")}</p>
      <EduIDButton buttonStyle="primary" type="submit" onClick={showSecurityKey} id="mfa-security-key">
        {translate("login.mfa.primary-option.button")}
      </EduIDButton>
    </Fragment>
  );
};

interface SecurityKeyProps {
  translate(msg: string): string;
}

const SecurityKey = (props: SecurityKeyProps): JSX.Element => {
  const { translate } = props;
  const [selected, setSelected] = useState(false);
  const [retryToggle, setRetryToggle] = useState(false);
  return (
    <div className="primary" tabIndex={0}>
      <div className="option">
        {selected ? (
          <>
            <div className="button-pair selected">
              <p className="heading">{translate("login.mfa.primary-option.title")}</p>
              <CloseButton setSelected={setSelected} />
            </div>
            <div className="button-pair bottom">
              <img src={SecurityKeyGif} alt="animation of security key inserted into computer" />
              <RetryButton retryToggle={retryToggle} setRetryToggle={setRetryToggle} />
            </div>
          </>
        ) : (
          <SecurityKeyUnselected setSelected={setSelected} {...props} />
        )}
      </div>
      {selected && <p className="help-link">{translate("login.mfa.primary-option.hint")}</p>}
    </div>
  );
};

// run-time type checking in development mode
SecurityKey.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(SecurityKey);

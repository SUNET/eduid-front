import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postRefForWebauthnChallenge } from "../../../redux/actions/postRefForWebauthnChallengeActions";
import SecurityKey from "./SecurityKey";
import ButtonSecondary from "../../Buttons/ButtonSecondary";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let FrejaOption = (props) => {
  const { loading, translate } = props;

  // the following are dynamic in prev version
  const idp = "http://dev.test.swedenconnect.se/";
  const encodedUrl = btoa(window.location);
  // om frejaUrlDomain inte slutar på "/" sätt dit ett med .concat("/")
  // https://eidas.eduid.docker/  (i dev slutar det på /)
  const frejaUrlDomain = useSelector((state) => state.config.eidas_url);
  // dev: "https://eidas.eduid.docker/"
  // (?) QA: "https://eidas.eduid.se/"
  // prod: "https://eidas.eduid.se/"
  const mfa_authn_idp = "http://dev.test.swedenconnect.se/idp";
  // dev: "http://dev.test.swedenconnect.se/idp"
  // (?) QA: https://idp-sweden-connect-valfr-2017.test.frejaeid.com
  // prod: https://idp-sweden-connect-valfr-2017.prod.frejaeid.com

  const frejaLink = `${frejaUrlDomain}mfa-authentication?idp=${idp}idp&next=${encodedUrl}`;
  // dev: "https://eidas.eduid.docker/mfa-authentication?idp=http://dev.test.swedenconnect.se/idp&next=aHR0cHM6Ly9sb2dpbi5lZHVpZC5kb2NrZXIvbG9naW4vbWZhLzJjZDViYTE2LWJiMzYtNDFiYy05ZmIyLWJiZjQ4MGRlZGIwOA=="
  // (?) QA: "https://eidas.eduid.se/mfa-authentication?idp=https://idp-sweden-connect-valfr-2017.test.frejaeid.com&next=aHR0cHM6Ly9sb2dpbi5lZHVpZC5kb2NrZXIvbG9naW4vbWZhLzJjZDViYTE2LWJiMzYtNDFiYy05ZmIyLWJiZjQ4MGRlZGIwOA=="
  // prod: https://eidas.eduid.se/mfa-authentication?idphttps://idp-sweden-connect-valfr-2017.prod.frejaeid.com&next=aHR0cHM6Ly9sb2dpbi5lZHVpZC5kb2NrZXIvbG9naW4vbWZhLzJjZDViYTE2LWJiMzYtNDFiYy05ZmIyLWJiZjQ4MGRlZGIwOA==

  // actual link to freja website
  // const swe_connect_test_url = "https://idp-sweden-connect-valfr-2017-ct.test.frejaeid.com/idp/extauth?conversation=e1s1";

  // in actual prod:
  // https://eidas.eduid.se/mfa-authentication?idp=https://idp-sweden-connect-valfr-2017.prod.frejaeid.com&next=aHR0cHM6Ly9sb2dpbi5pZHAuZWR1aWQuc2Uvc2VydmljZXMvYWN0aW9uczIv
  
 return (
    <div className="secondary">
      <div className="option">
        <p className="heading">
          {translate("login.mfa.secondary-option.title")}
        </p>
        <ButtonSecondary
          type="submit"
          onClick={() => {
            window.open(external_mfa_url, "_blank").focus();
          }}
          disabled={loading}
          aria-disabled={loading}
          id="mfa-freja"
        >
          {translate("login.mfa.secondary-option.button")}
        </ButtonSecondary>
      </div>
    </div>
  );
};

let MultiFactorAuth = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postRefForWebauthnChallenge());
  }, []);
  const { translate } = props;
  return (
    <div className="mfa">
      <h2 className="heading">{translate("login.mfa.h2-heading")}</h2>
      <p>{translate("login.mfa.paragraph")}</p>
      <div className="options">
        <SecurityKey {...props} />
        <FrejaOption {...props} />
      </div>
    </div>
  );
};

MultiFactorAuth.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(MultiFactorAuth);

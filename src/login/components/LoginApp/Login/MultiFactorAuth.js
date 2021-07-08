import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postRefForWebauthnChallenge } from "../../../redux/actions/postRefForWebauthnChallengeActions";
import SecurityKey from "./SecurityKey";
import ButtonSecondary from "../../Buttons/ButtonSecondary";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let FrejaOption = (props) => {
  const { loading, translate } = props;
  const idp = "http://dev.test.swedenconnect.se/idp";
  // const idp = useSelector((state) => state.config.mfa_auth_idp);
  // ensure url has one slash at the end to be functional in the link
  const frejaUrlDomain = useSelector((state) => state.config.eidas_url);
  const frejaUrlDomainSlash = frejaUrlDomain.endsWith("/")
    ? frejaUrlDomain
    : frejaUrlDomain.contact("/");
  const frejaLink = `${frejaUrlDomainSlash}mfa-authentication?idp=${idp}`;
  return (
    <div className="secondary">
      <div className="option">
        <p className="heading">
          {translate("login.mfa.secondary-option.title")}
        </p>
        <ButtonSecondary
          type="submit"
          onClick={() => {
            window.open(frejaLink, "_blank").focus();
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

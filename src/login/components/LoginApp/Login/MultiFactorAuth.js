import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SecurityKey from "./SecurityKey";
import FrejaeID from "./FrejaeID";
import PropTypes from "prop-types";
import { postRefForWebauthnChallenge } from "../../../redux/actions/postRefForWebauthnChallengeActions";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

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
        <FrejaeID {...props} />
      </div>
    </div>
  );
};

MultiFactorAuth.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(MultiFactorAuth);

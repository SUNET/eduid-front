import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SecurityKey from "./SecurityKey";
import FrejaeID from "./FrejaeID";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import loginSlice from "../../../redux/slices/loginSlice";

interface MultiFactorAuthProps {
  translate(msg: string): string;
}

const MultiFactorAuth = (props: MultiFactorAuthProps): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginSlice.actions.postRefForWebauthnChallenge());
  }, []);
  const { translate } = props;
  return (
    <div className="mfa">
      <h1>{translate("login.mfa.h2-heading")}</h1>
      <div className="preamble">
        <p className="preamble" tabIndex={0}>
          {translate("login.mfa.paragraph")}
        </p>
      </div>
      <div className="options">
        <SecurityKey {...props} />
        <FrejaeID {...props} />
      </div>
    </div>
  );
};

// run-time type checking in development mode
MultiFactorAuth.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(MultiFactorAuth);

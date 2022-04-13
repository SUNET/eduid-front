import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import SecurityKey from "./SecurityKey";
import FrejaeID from "./FrejaeID";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import loginSlice from "../../../redux/slices/loginSlice";
import { LoginAtServiceInfo } from "./LoginAtServiceInfo";

interface MultiFactorAuthProps {
  translate(msg: string): string;
}

const MultiFactorAuth = (props: MultiFactorAuthProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const service_info = useAppSelector((state) => state.login.service_info);
  useEffect(() => {
    dispatch(loginSlice.actions.postRefForWebauthnChallenge());
  }, []);
  const { translate } = props;
  return (
    <div className="mfa">
      <h3 className="heading heading-4">{translate("login.mfa.h2-heading")}</h3>
      <LoginAtServiceInfo service_info={service_info} />
      <p tabIndex={0}>{translate("login.mfa.paragraph")}</p>
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

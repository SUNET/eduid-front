import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import SecurityKey from "./SecurityKey";
import FrejaeID from "./FrejaeID";
import loginSlice from "../../../redux/slices/loginSlice";
import { LoginAtServiceInfo } from "./LoginAtServiceInfo";
import { FormattedMessage } from "react-intl";

const MultiFactorAuth = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const service_info = useAppSelector((state) => state.login.service_info);

  useEffect(() => {
    dispatch(loginSlice.actions.postRefForWebauthnChallenge());
  }, []);

  return (
    <div className="mfa">
      <h1>
        <FormattedMessage defaultMessage="Log in: Extra level of security" description="Login Mfa heading" />
      </h1>
      <div className="lead">
        <LoginAtServiceInfo service_info={service_info} />
      </div>
      <p>
        <FormattedMessage
          defaultMessage="You need to choose a second method to authenticate yourself. This helps guarantee that only you can access your eduID."
          description="Login Mfa paragraph"
        />
      </p>
      <div className="options">
        <SecurityKey />
        <FrejaeID />
      </div>
    </div>
  );
};

export default MultiFactorAuth;

import EduIDButton from "components/EduIDButton";
import { useErrorsAppSelector } from "errors-hooks";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";
import "../../styles/index.scss";
import { AuthenticationFailure } from "./AuthenticationFailure";
import { AuthorizationFailure } from "./AuthorizationFailure";
import { errorURLData, parseErrorURL } from "./errorURLParser";
import { IdentificationFailure } from "./IdentificationFailure";
import { OtherError } from "./OtherError";
import { UnknownError } from "./UnknownError";

export interface FailureComponentProps {
  errorURL: errorURLData;
}

export function Errors() {
  /* Parse the URL from query parameters */
  const query = new URLSearchParams(useLocation().search);
  const is_configured = useErrorsAppSelector((state) => state.config.is_configured);
  const dashboard_url = useErrorsAppSelector((state) => state.config.dashboard_url);

  const [errorURL, setErrorURL] = useState<errorURLData>({});
  useEffect(() => {
    setErrorURL(parseErrorURL(query));
  }, []);

  function handleDashboardOnClick() {
    if (is_configured && dashboard_url) {
      window.location.href = dashboard_url;
    }
  }

  const isUnknown =
    errorURL.code !== "IDENTIFICATION_FAILURE" &&
    errorURL.code !== "AUTHENTICATION_FAILURE" &&
    errorURL.code !== "AUTHORIZATION_FAILURE" &&
    errorURL.code !== "OTHER_ERROR";

  return (
    <div className="horizontal-content-margin">
      <div className="swamid-error">
        {errorURL.code === "IDENTIFICATION_FAILURE" && <IdentificationFailure errorURL={errorURL} />}
        {errorURL.code === "AUTHENTICATION_FAILURE" && <AuthenticationFailure errorURL={errorURL} />}
        {errorURL.code === "AUTHORIZATION_FAILURE" && <AuthorizationFailure errorURL={errorURL} />}
        {errorURL.code === "OTHER_ERROR" && <OtherError errorURL={errorURL} />}
        {isUnknown && <UnknownError errorURL={errorURL} />}
        <div className="flex-between">
          <div className="button-pair"></div>
          <EduIDButton buttonstyle="primary" type="submit" id="dashboard-button" onClick={handleDashboardOnClick}>
            <FormattedMessage defaultMessage="Dashboard" description="Errors button" />
          </EduIDButton>
        </div>
        <ErrorTechnicalInfo errorURL={errorURL} />
      </div>
    </div>
  );
}

export function ErrorTechnicalInfo(props: { errorURL: errorURLData }): JSX.Element {
  const error_info = useErrorsAppSelector((state) => state.config.error_info);

  return (
    <React.Fragment>
      <div className={"technical-info-heading"}>
        <p>
          <FormattedMessage defaultMessage={"Technical Information"} description="errorURL" />
        </p>
      </div>
      <div className={"technical-info-box"}>
        {error_info?.logged_in && (
          <div className={"technical-info-text"} key="eppn">
            <p>eduID identifier</p>
            <p>{error_info.eppn}</p>
          </div>
        )}
        {Object.entries(props.errorURL).map(([key, value]) => {
          if (!value) {
            return null;
          }
          return (
            <div className={"technical-info-text"} key={key}>
              <p>{key.toUpperCase()}</p>
              <p>{key === "date" && value ? value.toISOString() : value}</p>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

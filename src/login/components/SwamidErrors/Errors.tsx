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
import { EduidError } from "./EduidError";
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
    errorURL.code !== "OTHER_ERROR" &&
    errorURL.code !== "EDUID_ERROR";

  return (
    <div className="horizontal-content-margin content">
      <div className="swamid-error">
        {errorURL.code === "IDENTIFICATION_FAILURE" && <IdentificationFailure errorURL={errorURL} />}
        {errorURL.code === "AUTHENTICATION_FAILURE" && <AuthenticationFailure errorURL={errorURL} />}
        {errorURL.code === "AUTHORIZATION_FAILURE" && <AuthorizationFailure errorURL={errorURL} />}
        {errorURL.code === "EDUID_ERROR" && <EduidError errorURL={errorURL} />}
        {errorURL.code === "OTHER_ERROR" && <OtherError errorURL={errorURL} />}
        {isUnknown && <UnknownError errorURL={errorURL} />}
        <p>
          <FormattedMessage
            defaultMessage="You can review your settings at the"
            description="Errors go to dashboard instruction"
          />
          &nbsp;
          <a className="link" id="dashboard-button" onClick={handleDashboardOnClick}>
            <FormattedMessage defaultMessage="eduID Dashboard" description="Errors button" />
          </a>
        </p>
        <ErrorTechnicalInfo errorURL={errorURL} />
      </div>
    </div>
  );
}

export function ErrorTechnicalInfo(props: { errorURL: errorURLData }): JSX.Element {
  const error_info = useErrorsAppSelector((state) => state.config.error_info);

  return (
    <React.Fragment>
      <div className="figure">
        <table className="error-info">
          {error_info !== undefined ? (
            <>
              <caption>
                <h3>
                  <FormattedMessage defaultMessage="Technical Information" description="errorURL" />
                </h3>
              </caption>
              <thead>
                <tr>
                  <th className="figcaption">
                    <FormattedMessage defaultMessage="Name" description="column name label" />
                  </th>
                  <th className="figcaption">
                    <FormattedMessage defaultMessage="Value" description="column value label" />
                  </th>
                </tr>
              </thead>

              <tbody>
                {error_info?.logged_in && (
                  <tr key="eppn">
                    <td>
                      <strong>
                        <FormattedMessage
                          defaultMessage="eduID identifier"
                          description="column eduID identifier label"
                        />
                      </strong>
                    </td>
                    <td>{error_info.eppn}</td>
                  </tr>
                )}
                {Object.entries(props.errorURL).map(([key, value]) => {
                  if (!value) {
                    return null;
                  }
                  return (
                    <tr key={key}>
                      <td>
                        <strong>{key}</strong>
                      </td>
                      <td>{key === "date" && value ? value.toISOString() : value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </>
          ) : (
            <tbody>
              <tr>
                <td className="plain-cell">
                  <strong>
                    <FormattedMessage
                      defaultMessage="There is no technical information available"
                      description="no error information message"
                    />
                  </strong>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </React.Fragment>
  );
}

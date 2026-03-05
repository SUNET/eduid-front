import EduIDButton from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router";
import { AuthenticationFailure } from "./AuthenticationFailure";
import { AuthorizationFailure } from "./AuthorizationFailure";
import { EduidError } from "./EduidError";
import { IdentificationFailure } from "./IdentificationFailure";
import { OtherError } from "./OtherError";
import { UnknownError } from "./UnknownError";
import { ErrorURLData, parseErrorURL } from "./errorURLParser";

export interface FailureComponentProps {
  errorURL: ErrorURLData;
}

export function Errors() {
  /* Parse the URL from query parameters */
  const query = new URLSearchParams(useLocation().search);
  const is_configured = useAppSelector((state) => state.config.is_configured);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  const errorURL = parseErrorURL(query);

  function handleDashboardOnClick() {
    if (is_configured && dashboard_link) {
      globalThis.location.href = dashboard_link;
    }
  }

  const isUnknown =
    errorURL.code !== "IDENTIFICATION_FAILURE" &&
    errorURL.code !== "AUTHENTICATION_FAILURE" &&
    errorURL.code !== "AUTHORIZATION_FAILURE" &&
    errorURL.code !== "OTHER_ERROR" &&
    errorURL.code !== "EDUID_ERROR";

  return (
    <div className="error-page">
      {errorURL.code === "IDENTIFICATION_FAILURE" && <IdentificationFailure errorURL={errorURL} />}
      {errorURL.code === "AUTHENTICATION_FAILURE" && <AuthenticationFailure />}
      {errorURL.code === "AUTHORIZATION_FAILURE" && <AuthorizationFailure />}
      {errorURL.code === "EDUID_ERROR" && <EduidError errorURL={errorURL} />}
      {errorURL.code === "OTHER_ERROR" && <OtherError />}
      {isUnknown && <UnknownError />}
      <p>
        <FormattedMessage
          defaultMessage="You can review your settings at the"
          description="Errors go to dashboard instruction"
        />
        &nbsp;
        <EduIDButton buttonstyle="link" id="dashboard-button" onClick={handleDashboardOnClick}>
          <FormattedMessage defaultMessage="eduID Dashboard" description="Errors button" />
        </EduIDButton>
      </p>
      <ErrorTechnicalInfo errorURL={errorURL} />
    </div>
  );
}

export function ErrorTechnicalInfo(props: { errorURL: ErrorURLData }): React.JSX.Element {
  const error_info = useAppSelector((state) => state.config.error_info);

  return (
    <div className="figure">
      <table className="error-info">
        {props.errorURL.code ? (
          <React.Fragment>
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
                      <FormattedMessage defaultMessage="eduID identifier" description="column eduID identifier label" />
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
          </React.Fragment>
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
  );
}

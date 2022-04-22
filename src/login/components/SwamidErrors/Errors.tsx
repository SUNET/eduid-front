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

  const [errorURL, setErrorURL] = useState<errorURLData>({});
  useEffect(() => {
    setErrorURL(parseErrorURL(query));
  }, []);

  const isUnknown =
    errorURL.code !== "IDENTIFICATION_FAILURE" &&
    errorURL.code !== "AUTHENTICATION_FAILURE" &&
    errorURL.code !== "AUTHORIZATION_FAILURE" &&
    errorURL.code !== "OTHER_ERROR";

  return (
    <div className="horizontal-content-margin content">
      <div className="swamid-error">
        {errorURL.code === "IDENTIFICATION_FAILURE" && <IdentificationFailure errorURL={errorURL} />}
        {errorURL.code === "AUTHENTICATION_FAILURE" && <AuthenticationFailure errorURL={errorURL} />}
        {errorURL.code === "AUTHORIZATION_FAILURE" && <AuthorizationFailure errorURL={errorURL} />}
        {errorURL.code === "OTHER_ERROR" && <OtherError errorURL={errorURL} />}
        {isUnknown && <UnknownError errorURL={errorURL} />}
        <ErrorTechnicalInfo errorURL={errorURL} />
      </div>
    </div>
  );
}

export function ErrorTechnicalInfo(props: { errorURL: errorURLData }): JSX.Element {
  return (
    <React.Fragment>
      <figure className={"figure"}>
        <table className={"error-info"}>
          <thead>
            <figcaption>
              <FormattedMessage defaultMessage={"Technical Information"} description="errorURL" />
            </figcaption>
          </thead>
          <tbody>
            {Object.entries(props.errorURL).map(([key, value]) => {
              return (
                <tr className={""} key={key}>
                  <td className="">
                    <strong>{key.toUpperCase()}</strong>
                  </td>
                  <td>{key === "date" && value ? value.toISOString() : value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <div className={"technical-info-box"}>
        {Object.entries(props.errorURL).map(([key, value]) => {
          return (
            <div className={"technical-info-text"} key={key}>
              <p>{key.toUpperCase()}</p>
              <p>{key === "date" && value ? value.toISOString() : value}</p>
            </div>
          );
        })}
      </div> */}
      </figure>
    </React.Fragment>
  );
}

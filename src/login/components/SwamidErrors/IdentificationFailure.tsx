import React from "react";
import { FormattedMessage } from "react-intl";
import { FailureComponentProps } from "./Errors";

export function IdentificationFailure(props: FailureComponentProps): JSX.Element {
  return (
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Identification failed" description="ErrorURL identification failure" />
      </h1>
      {props.errorURL.ctx && props.errorURL.ctx.toLowerCase() === "noredupersonnin" ? <MissingNin /> : <Default />}
    </React.Fragment>
  );
}

function MissingNin(): JSX.Element {
  return (
    <React.Fragment>
      <p>
        <FormattedMessage
          defaultMessage={`The service that you tried to access requires a "confirmed"
                         Swedish National Identity Number (personnummer).`}
          description="ErrorURL identification failure"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage={`If you have a Swedish National Identity Number, go to the eduID dashboard and confirm it.`}
          description="ErrorURL identification failure"
        />
      </p>
    </React.Fragment>
  );
}

function Default(): JSX.Element {
  return (
    <React.Fragment>
      <p>
        <FormattedMessage
          defaultMessage={`The service that you tried to access did not get all required attributes for
                           identification and/or personalisation.`}
          description="ErrorURL identification failure"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage={`This may be because eduID is missing those attributes or that eduID is not configured
                           to release those attributes to the service you tried to access.`}
          description="ErrorURL identification failure"
        />
      </p>
    </React.Fragment>
  );
}

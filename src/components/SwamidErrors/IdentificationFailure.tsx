import { loginApi } from "apis/eduidLogin";
import { useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { FailureComponentProps } from "./Errors";

export function IdentificationFailure(props: FailureComponentProps): React.JSX.Element {
  const is_configured = useAppSelector((state) => state.config.is_configured);
  const [fetchErrorInfo] = loginApi.useLazyFetchErrorInfoQuery();

  useEffect(() => {
    if (is_configured) {
      // call fetchErrorInfo once state.config.error_info_url is initialised
      fetchErrorInfo();
    }
  }, [is_configured]);

  return (
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Identification failed" description="ErrorURL identification failure" />
      </h1>
      {props.errorURL.ctx && props.errorURL.ctx.toLowerCase() === "noredupersonnin" ? <MissingNin /> : <Default />}
    </React.Fragment>
  );
}

function MissingNin(): React.JSX.Element {
  const error_info = useAppSelector((state) => state.config.error_info);

  let SpecificMessage;

  if (error_info?.logged_in && error_info.has_locked_nin && !error_info.has_verified_nin) {
    SpecificMessage = (
      <FormattedMessage
        defaultMessage="You need to re-confirm your identity in the eduID Dashboard to access this service."
        description="ErrorURL identification failure"
      />
    );
  } else {
    SpecificMessage = (
      <FormattedMessage
        defaultMessage="If you have a Swedish National Identity Number, go to the eduID dashboard and confirm it."
        description="ErrorURL identification failure"
      />
    );
  }

  return (
    <React.Fragment>
      <p>
        <FormattedMessage
          defaultMessage={`The service that you tried to access requires a "confirmed"
                         Swedish National Identity Number (personnummer).`}
          description="ErrorURL identification failure"
        />
      </p>
      <p>{SpecificMessage}</p>
    </React.Fragment>
  );
}

function Default(): React.JSX.Element {
  return (
    <React.Fragment>
      <p>
        <FormattedMessage
          defaultMessage="The service that you tried to access did not get all required attributes for
                           identification and/or personalisation."
          description="ErrorURL identification failure"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="This may be because eduID is missing those attributes or that eduID is not configured
                           to release those attributes to the service you tried to access."
          description="ErrorURL identification failure"
        />
      </p>
    </React.Fragment>
  );
}

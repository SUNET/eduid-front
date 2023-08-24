import { useAppSelector } from "hooks";
import { Fragment } from "react";
import { FormattedMessage } from "react-intl";

export function GenericError() {
  return (
    <Fragment>
      <div className="horizontal-content-margin content">
        <div className="error-boundary error-page">
          <h1>
            <FormattedMessage
              defaultMessage="There was a problem displaying the page."
              description="generic error page"
            />
          </h1>
          <p>
            <FormattedMessage
              defaultMessage="The issue has been reported to the team."
              description="generic error page"
            />
          </p>
          <p>
            <ToHomeOption />
          </p>
        </div>
      </div>
    </Fragment>
  );
}

function ToHomeOption() {
  const toHome = useAppSelector((state) => state.config.eduid_site_url);
  return (
    <a className="text-link" href={toHome}>
      <FormattedMessage defaultMessage="Return to home" description="generic error page" />
    </a>
  );
}

import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";

export function GenericError() {
  return (
    <div className="horizontal-content-margin content">
      <div className="error-boundary error-page">
        <h1>
          <FormattedMessage
            id="genericError.heading"
            defaultMessage="There was a problem displaying the page."
            description="generic error page"
          />
        </h1>
        <p>
          <FormattedMessage
            id="genericError.reported"
            defaultMessage="The issue has been reported to the team."
            description="generic error page"
          />
        </p>
        <p>
          <ToHomeOption />
        </p>
      </div>
    </div>
  );
}

function ToHomeOption() {
  const toHome = useAppSelector((state) => state.config.eduid_site_link);
  return (
    <a href={toHome}>
      <FormattedMessage id="genericError.homeButton" defaultMessage="Return to home" description="generic error page" />
    </a>
  );
}

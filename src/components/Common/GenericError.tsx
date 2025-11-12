import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";
import EduIDLink from "./EduIDLink";

export function GenericError() {
  return (
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
  );
}

function ToHomeOption() {
  const toHome = useAppSelector((state) => state.config.eduid_site_link) || "/";
  return (
    <EduIDLink to={toHome}>
      <FormattedMessage defaultMessage="Return to home" description="generic error page" />
    </EduIDLink>
  );
}

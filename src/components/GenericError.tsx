import { useAppSelector } from "login/app_init/hooks";
import { Fragment } from "react";
import { FallbackProps } from "react-error-boundary";
import { FormattedMessage } from "react-intl";

export function GenericError(props: FallbackProps) {
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
            You can try to <TryAgainOption {...props} /> or <ToHomeOption />.
          </p>
        </div>
      </div>
    </Fragment>
  );
}

function TryAgainOption(props: FallbackProps) {
  return (
    <a
      id=""
      className="text-link"
      onClick={() => {
        if (props.resetErrorBoundary) {
          props.resetErrorBoundary();
        }
      }}
    >
      <FormattedMessage defaultMessage="reload the page" description="generic error page" />
    </a>
  );
}

function ToHomeOption() {
  const toHome = useAppSelector((state) => state.config.eduid_site_url);
  return (
    <a
      id=""
      className="text-link"
      onClick={() => {
        if (toHome) {
          window.location.href = toHome;
        }
      }}
    >
      <FormattedMessage defaultMessage="Return to home" description="generic error page" />
    </a>
  );
}

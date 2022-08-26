import { faHome, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "login/app_init/hooks";
import { Fragment } from "react";
import { FallbackProps } from "react-error-boundary";
import { FormattedMessage } from "react-intl";

export function GenericError(props: FallbackProps) {
  return (
    <Fragment>
      <div className="horizontal-content-margin content">
        <div className="error-boundary swamid-error">
          <h1>
            {" "}
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
          <div className="options">
            <TryAgainOption {...props} />
            <ToHomeOption />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function TryAgainOption(props: FallbackProps) {
  return (
    <div className="option">
      <label>
        <FormattedMessage defaultMessage="Try again:" description="generic error page" />
      </label>
      <div className="icon-text">
        <button
          className="icon"
          onClick={() => {
            if (props.resetErrorBoundary) {
              props.resetErrorBoundary();
            }
          }}
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>
        <p>
          <FormattedMessage defaultMessage="Reload page" description="generic error page" />
        </p>
      </div>
    </div>
  );
}

function ToHomeOption() {
  const toHome = useAppSelector((state) => state.config.eduid_site_url);
  return (
    <div className="option">
      <label>
        <FormattedMessage defaultMessage="Start over" description="generic error page" />
      </label>
      <div className="icon-text">
        <button
          className="icon"
          onClick={() => {
            if (toHome) {
              window.location.href = toHome;
            }
          }}
        >
          <FontAwesomeIcon icon={faHome} />
        </button>
        <p>
          <FormattedMessage defaultMessage="Return to home" description="generic error page" />
        </p>
      </div>
    </div>
  );
}

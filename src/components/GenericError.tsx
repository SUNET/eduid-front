import { useAppSelector } from "login/app_init/hooks";
import { Fragment } from "react";
import { FallbackProps } from "react-error-boundary";
import { FormattedMessage } from "react-intl";
import EduIDButton from "components/EduIDButton";

export function GenericError(props: FallbackProps) {
  return (
    <Fragment>
      <div className="horizontal-content-margin content">
        <div className="error-boundary error-page">
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
          <p className="buttons">
            You can try to
            <TryAgainOption {...props} />
            or
            <ToHomeOption />
          </p>
        </div>
      </div>
    </Fragment>
  );
}

function TryAgainOption(props: FallbackProps) {
  return (
    <EduIDButton
      id=""
      buttonstyle="link"
      className=" lowercase"
      onClick={() => {
        if (props.resetErrorBoundary) {
          props.resetErrorBoundary();
        }
      }}
    >
      <FormattedMessage defaultMessage="Reload the page" description="generic error page" />
    </EduIDButton>
  );
}

function ToHomeOption() {
  const toHome = useAppSelector((state) => state.config.eduid_site_url);
  return (
    <EduIDButton
      id=""
      buttonstyle="link"
      className=" lowercase"
      onClick={() => {
        if (toHome) {
          window.location.href = toHome;
        }
      }}
    >
      <FormattedMessage defaultMessage="Return to home" description="generic error page" />
    </EduIDButton>
  );
}

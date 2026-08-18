import EduIDButton from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";

/**
 * Terminal screen for a reset state that has been locked after too many incorrect codes.
 *
 * The lock lasts until the emailed code expires, and requesting a new code while locked returns
 * the same error, so this screen deliberately offers no way to retry. No step indicator either -
 * the flow is over, and showing progress would misrepresent it.
 */
export function ResetPasswordLocked(): React.JSX.Element {
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  return (
    <div className="step-container">
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Reset Password: Too many attempts"
            description="Reset Password locked heading"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="Too many incorrect codes have been entered. For security reasons this password reset has been stopped."
              description="Reset Password locked lead"
            />
          </p>
          <p>
            <FormattedMessage
              defaultMessage="Please wait until the code expires, then start over from the login page."
              description="Reset Password locked instruction"
            />
          </p>
        </div>
      </section>

      <form action={dashboard_link ?? "/"} method="GET">
        <div className="buttons">
          <EduIDButton buttonstyle="link normal-case text-large" id="reset-password-locked-exit" type="submit">
            <FormattedMessage defaultMessage="Go to login" description="Reset Password locked exit button" />
          </EduIDButton>
        </div>
      </form>
    </div>
  );
}

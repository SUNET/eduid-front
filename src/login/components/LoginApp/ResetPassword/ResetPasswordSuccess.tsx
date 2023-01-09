import { FormattedMessage } from "react-intl";
import { useAppSelector } from "../../../app_init/hooks";

export function ResetPasswordSuccess(): JSX.Element {
  const toHome = useAppSelector((state) => state.config.eduid_site_url);

  return (
    <>
      <p>
        <FormattedMessage
          defaultMessage="Password has been updated."
          description="Reset Password set new password success"
        />
      </p>
      <a id="return-login" href={toHome}>
        <FormattedMessage defaultMessage="Go to eduID" description="Reset Password go to eduID" />
      </a>
    </>
  );
}

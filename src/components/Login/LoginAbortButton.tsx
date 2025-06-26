import { loginApi } from "apis/login";
import EduIDButton from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";

export function LoginAbortButton(): JSX.Element {
  const loginRef = useAppSelector((state) => state.login.ref);
  const [ fetchAbort_trigger ] = loginApi.useLazyFetchAbortQuery();

  async function handleOnClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault(); // don't submit the form when this button is clicked

    if (loginRef) {
      fetchAbort_trigger({ ref: loginRef });
    }
  }

  return (
    <EduIDButton type="button" buttonstyle="secondary" onClick={handleOnClick} id="login-abort-button">
      <FormattedMessage defaultMessage="Cancel" description="button cancel" />
    </EduIDButton>
  );
}

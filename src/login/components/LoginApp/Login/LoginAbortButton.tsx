import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { fetchAbort } from "apis/eduidLogin";
import EduIDButton from "components/EduIDButton";

export function LoginAbortButton(): JSX.Element {
  const loginRef = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();

  async function handleOnClick() {
    if (loginRef) {
      dispatch(fetchAbort({ ref: loginRef }));
    }
  }

  return (
    <EduIDButton buttonstyle="secondary" type="submit" onClick={handleOnClick} id="login-abort-button">
      <FormattedMessage defaultMessage="Abort" description="Login button" />
    </EduIDButton>
  );
}

import { EduIDButton } from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import resetPasswordSlice from "slices/ResetPassword";

interface BackToLoginButtonProps {
  primary?: boolean;
  onClickHandler?(): void; // optional callback for when the button is clicked
}

export function GoBackButton({ onClickHandler, primary }: Readonly<BackToLoginButtonProps>): React.JSX.Element | null {
  const loginRef = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  if (!onClickHandler && !loginRef) {
    // for the default click handler, loginRef is mandatory
    return null;
  }

  function onClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (onClickHandler) {
      onClickHandler();
    } else if (dashboard_link) {
      document.location.href = dashboard_link;
      dispatch(resetPasswordSlice.actions.resetEmailStatus());
    }
  }

  const style = primary ? "primary" : "secondary";

  return (
    <EduIDButton buttonstyle={`${style} normal-case`} id="go-back-button" onClick={onClick}>
      <FormattedMessage defaultMessage="Go back" description="Account recovery Go back button" />
    </EduIDButton>
  );
}

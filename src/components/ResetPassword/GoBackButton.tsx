import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import resetPasswordSlice from "slices/ResetPassword";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

interface BackToLoginButtonProps {
  primary?: boolean;
  onClickHandler?(): void; // optional callback for when the button is clicked
}

export function GoBackButton(props: BackToLoginButtonProps): JSX.Element | null {
  const loginRef = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const dashboard_url = useAppSelector((state) => state.config.dashboard_url);

  if (!props.onClickHandler && !loginRef) {
    // for the default click handler, loginRef is mandatory
    return null;
  }

  function onClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (props.onClickHandler) {
      props.onClickHandler();
    } else if (dashboard_url) {
      document.location.href = dashboard_url;
      dispatch(resetPasswordSlice.actions.resetEmailStatus());
      resetPasswordContext.resetPasswordService.send({ type: "GO_BACK" });
    }
  }

  const style = props.primary ? "primary" : "secondary";

  return (
    <EduIDButton buttonstyle={style} className="normal-case" id="go-back-button" onClick={onClick}>
      <FormattedMessage defaultMessage="Go back" description="Account recovery Go back button" />
    </EduIDButton>
  );
}

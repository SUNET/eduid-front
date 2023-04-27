import EduIDButton from "components/EduIDButton";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

interface BackToLoginButtonProps {
  primary?: boolean;
  onClickHandler?(): void; // optional callback for when the button is clicked
}

export function GoBackButton(props: BackToLoginButtonProps): JSX.Element | null {
  const navigate = useNavigate();
  const loginRef = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  if (!props.onClickHandler && !loginRef) {
    // for the default click handler, loginRef is mandatory
    return null;
  }

  function onClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (props.onClickHandler) {
      props.onClickHandler();
    } else {
      navigate(`/login/${loginRef}`);
      dispatch(resetPasswordSlice.actions.resetEmailStatus());
      resetPasswordContext.resetPasswordService.send({ type: "ABORT" });
    }
  }

  const style = props.primary ? "primary" : "secondary";

  return (
    <EduIDButton buttonstyle={style} className="normal-case" id="go-back-button" onClick={onClick}>
      <FormattedMessage defaultMessage="Go back" description="Account recovery Go back button" />
    </EduIDButton>
  );
}

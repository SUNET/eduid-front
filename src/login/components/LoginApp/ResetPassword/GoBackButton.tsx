import EduIDButton from "components/EduIDButton";
import { useAppSelector, useAppDispatch } from "login/app_init/hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";

interface BackToLoginButtonProps {
  primary?: boolean;
  onClickHandler?(): void; // optional callback for when the button is clicked
}

export function GoBackButton(props: BackToLoginButtonProps): JSX.Element | null {
  const navigate = useNavigate();
  const loginRef = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();

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
    }
  }

  const style = props.primary ? "primary" : "secondary";

  return (
    <EduIDButton buttonstyle={style} className="normal-case" id="go-back-button" onClick={onClick}>
      <FormattedMessage defaultMessage="Go back" description="Account recovery Go back button" />
    </EduIDButton>
  );
}

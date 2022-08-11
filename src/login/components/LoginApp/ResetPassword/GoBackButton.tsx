import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "login/app_init/hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom-v5-compat";
import { Button } from "reactstrap";

interface BackToLoginButtonProps {
  primary?: boolean; // use styling "primary" instead of the default, "secondary"
  onClickHandler?(): void; // optional callback for when the button is clicked
}

export function GoBackButton(props: BackToLoginButtonProps): JSX.Element | null {
  const navigate = useNavigate();
  const loginRef = useAppSelector((state) => state.login.ref);

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
    }
  }

  let color = "secondary";
  let className = "secondary";

  if (props.primary) {
    color = "primary";
    className = "primary";
  }

  return (
    <Button className={className} id="go-back-button" onClick={onClick} color={color}>
      <FontAwesomeIcon icon={faArrowLeft} />
      &nbsp;
      <FormattedMessage defaultMessage="Go back" description="Account recovery Go back button" />
    </Button>
  );
}

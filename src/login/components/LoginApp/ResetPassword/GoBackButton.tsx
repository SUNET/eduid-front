import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "login/app_init/hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import { Button } from "reactstrap";

interface BackToLoginButtonProps {
  secondary?: boolean; // use styling "primary" instead of the default, "secondary"
  primary?: boolean; // use styling "primary" instead of the default, "secondary"
  onClickHandler?(): void; // optional callback for when the button is clicked
}

export function GoBackButton(props: BackToLoginButtonProps): JSX.Element | null {
  const history = useHistory();
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
      history.push(`/login/${loginRef}`);
    }
  }

  let color = "";
  let className = "btn-link lowercase";

  if (props.primary) {
    color = "primary";
    className = "primary";
  }

  return (
    <Button className={className} id="go-back-button" onClick={onClick} color={color}>
      {/* <FontAwesomeIcon icon={faArrowLeft} /> 
      &nbsp;*/}
      <FormattedMessage defaultMessage="Back to login" description="Account recovery Go back button" />
    </Button>
  );
}

import { resetPasswordSlice } from "login/redux/slices/resetPasswordSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearNotifications } from "reducers/Notifications";

interface ResetPasswordLayoutProps {
  emailCode?: string;
  heading: string;
  // ReactNode allows multiple elements, strings, numbers, fragments, portals
  children?: React.ReactNode;
  description: string;
  linkInfoText: string;
  linkInfoHeading: string;
  linkText: string;
}

const ResetPasswordLayout = (props: ResetPasswordLayoutProps): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const continueSetPassword = () => {
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("without"));
    history.push(`/reset-password/set-new-password/${props.emailCode}`);
    dispatch(clearNotifications());
  };
  return (
    <>
      <h1>{props.heading}</h1>
      <div id="reset-pass-display">
        <p>{props.description}</p>
        {props.children}
        <h4 className="description-without-security">{props.linkInfoHeading}</h4>
        <p>
          {props.linkInfoText}&nbsp;
          <a className="text-link" id="continue-without-security" onClick={() => continueSetPassword()}>
            {props.linkText}
          </a>
        </p>
      </div>
    </>
  );
};

export default ResetPasswordLayout;

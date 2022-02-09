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
      <p className="heading">{props.heading}</p>
      <div id="reset-pass-display">
        <p>{props.description}</p>
        {props.children}
        <p className="description-without-security heading">{props.linkInfoHeading}</p>
        <p>
          {props.linkInfoText}
          <a id="continue-without-security" onClick={() => continueSetPassword()}>
            {" "}
            {props.linkText}
          </a>
        </p>
      </div>
    </>
  );
};

export default ResetPasswordLayout;

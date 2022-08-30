import { resetPasswordSlice } from "login/redux/slices/resetPasswordSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearNotifications } from "reducers/Notifications";

interface ResetPasswordLayoutProps {
  heading: string | JSX.Element;
  // ReactNode allows multiple elements, strings, numbers, fragments, portals
  children?: React.ReactNode;
  description: string | JSX.Element;
  linkInfoText: string | JSX.Element;
  linkInfoHeading: string | JSX.Element;
  linkText: string | JSX.Element;
}

const ResetPasswordLayout = (props: ResetPasswordLayoutProps): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const continueSetPassword = () => {
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("without"));
    navigate("/reset-password/set-new-password");
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

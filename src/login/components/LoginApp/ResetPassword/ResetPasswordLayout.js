import React from "react";
import { selectExtraSecurity } from "../../../redux/actions/postResetPasswordActions";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { eduidRMAllNotify } from "../../../../actions/Notifications";

const ResetPasswordLayout = (props) =>{
  const dispatch = useDispatch();
  const history = useHistory();
  const continueSetPassword = () => {
    dispatch(selectExtraSecurity("without"));
    history.push(`/reset-password/set-new-password/${props.emailCode}`);
    dispatch(eduidRMAllNotify());
  };
  return (
    <>
      <p className="heading">{props.heading}</p>
      <div id="reset-pass-display">
        <p>{props.description}</p>
        {props.children}
        <p className="decription-without-security">{props.linkInfoHeading}{props.linkInfoText}
          <a id="continue-without-security" onClick={()=>continueSetPassword()}> {props.linkText}</a>
        </p>
      </div>
    </>
  ) 
}

export default ResetPasswordLayout;
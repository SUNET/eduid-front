import React from "react";
import { selectExtraSecurity } from "../../../redux/actions/postResetPasswordActions";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

const ResetPasswordLayout = (props) =>{
  const dispatch = useDispatch();
  const history = useHistory();
  const setPasswordWithout = () => {
    dispatch(selectExtraSecurity("without"));
    history.push(`/reset-password/set-new-password/${props.emailCode}`)
  };
  return (
    <>
      <p className="heading">{props.heading}</p>
      <div id="reset-pass-display">
        <p>{props.description}</p>
        {props.children}
        <p className="decription-without-security">{props.linkInfoText}
          <a onClick={setPasswordWithout}> {props.linkText}</a> 
        </p>
      </div>
    </>
  ) 
}

export default ResetPasswordLayout;
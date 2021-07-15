import React from "react";

const ResetPasswordLayout = (props) =>{
  return (
    <>
      <p className="heading">{props.heading}</p>
      <div id="reset-pass-display">
        <p>{props.description}</p>
        {props.children}
        <p className="decription-without-security">{props.linkInfoText}
          <a href={`/reset-password/set-new-password/`}> {props.linkText}</a> 
        </p>
      </div>
    </>
  ) 
}

export default ResetPasswordLayout;
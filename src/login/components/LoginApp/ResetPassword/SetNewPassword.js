import React from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

function SetNewPassword(){
  return (
    <>
      <p className="heading">Set New Password</p>
    </>
  ) 
}

SetNewPassword.propTypes = {
};

export default InjectIntl(SetNewPassword);
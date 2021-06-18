import React from "react";
import i18n from "../../../translation/InjectIntl_HOC_factory";

function SetNewPassword(){
  return (
    <>
      <p className="heading">Set New Password</p>
    </>
  ) 
}

SetNewPassword.propTypes = {
};

export default i18n(SetNewPassword);
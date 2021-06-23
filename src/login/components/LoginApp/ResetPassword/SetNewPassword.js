import React from "react";
import i18n from "../../../translation/InjectIntl_HOC_factory";

function SetNewPassword(){
  return (
    <>
      <p className="heading">Set your new password</p>
      <p>A suggested password can be selected by clicking the input field. </p>
    </>
  ) 
}

SetNewPassword.propTypes = {
};

export default i18n(SetNewPassword);
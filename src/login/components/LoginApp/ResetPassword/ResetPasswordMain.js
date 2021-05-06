import React from "react";
import { withRouter } from "react-router-dom";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import { useSelector } from 'react-redux';

function ResetPasswordMain() {
    const state = useSelector(state => state);
    console.log("[RESET PASSWORD]", state)
    return (
      <>
        <h1>hi</h1>
      </>
    );

    
}

ResetPasswordMain.propTypes = {
};

export default i18n(withRouter(ResetPasswordMain));

import React from "react";
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import SuccessIconAnimation from "./SuccessIconAnimation";
import { useSelector } from "react-redux";

function ResetPasswordSuccess(props){
  const toHome = useSelector((state) => state.config.eduid_site_url);

  return (
    <>
      <SuccessIconAnimation />
      <div id="reset-pass-display">
        <p>{props.translate("resetpw.set-new-password-success")}</p>
        <a href={toHome}>{props.translate("resetpw.return-login")}</a> 
      </div>
    </>
  ) 
}

ResetPasswordSuccess.propTypes = {
  translate: PropTypes.func
};

export default InjectIntl(withRouter(ResetPasswordSuccess));
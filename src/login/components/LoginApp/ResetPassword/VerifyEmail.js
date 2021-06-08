import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { useLinkCode } from "../../../redux/actions/postResetPasswordActions"

function VerifyEmail(){
    const csrf_token = useSelector(state => state.resetPassword.csrf_token);
    const dispatch = useDispatch();

    // useEffect(() => {
    //   dispatch(useLinkCode());
    // }, []);


  return (
    <>
      <p className="heading">Verify email</p>
    </>
  ) 
}

VerifyEmail.propTypes = {
  translate: PropTypes.func,
  sendLink: PropTypes.func,
  invalid: PropTypes.bool
};

export default i18n(withRouter(VerifyEmail));
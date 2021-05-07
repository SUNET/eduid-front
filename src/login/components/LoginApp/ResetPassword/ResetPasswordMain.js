import React, {useEffect} from "react";
import { withRouter } from "react-router-dom";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import { useSelector, useDispatch,  } from 'react-redux';
import {getResetPassword} from "../../../redux/actions/resetPasswordActions"

const ResetPasswordMain = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.config.csrf_token);

  useEffect( () => {
    dispatch(getResetPassword());
  }, [state])

  return (
    <>
      <h1>Reset password main</h1>
    </>
  );
}

ResetPasswordMain.propTypes = {
};

export default i18n(withRouter(ResetPasswordMain));

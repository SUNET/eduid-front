import React, { useEffect } from "react";
import { withRouter, Route  } from "react-router-dom";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import { useSelector, useDispatch } from 'react-redux';
import { getResetPassword } from "../../../redux/actions/resetPasswordActions"
import SendResetPassLink from "./SendResetPassLink";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const ResetPasswordMain = () => {
  const dispatch = useDispatch();
  const csrf_token = useSelector(state => state.config.csrf_token);

  useEffect(() => {
    dispatch(getResetPassword());
  }, [csrf_token]);

  return (
    <div>
      <Route path={`/reset-password/`} component={SendResetPassLink} />
    </div>
  );
}

export default i18n(withRouter(ResetPasswordMain));
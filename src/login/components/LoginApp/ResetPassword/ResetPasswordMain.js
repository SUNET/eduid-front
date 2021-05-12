import React, { useEffect } from "react";
import { withRouter, Route  } from "react-router-dom";
import PropTypes from "prop-types";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import { useSelector, useDispatch } from 'react-redux';
import { getResetPassword } from "../../../redux/actions/resetPasswordActions"
import ResetPasswordEmailLink from "./ResetPasswordEmailLink";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const ResetPasswordMain = (props) => {
  console.log("[props]",props)
  const dispatch = useDispatch();
  const csrf_token = useSelector(state => state.config.csrf_token);

  useEffect(() => {
    dispatch(getResetPassword());
  }, [csrf_token]);

  return (
    <div>
      <Route path={`/reset-password/`} component={ResetPasswordEmailLink} />
    </div>
  );
}

ResetPasswordMain.propTypes = {
  translate: PropTypes.func,
  sendLink: PropTypes.func,
  invalid: PropTypes.bool
};

export default i18n(withRouter(ResetPasswordMain));
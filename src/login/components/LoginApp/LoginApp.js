/* eslint-disable */
import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import Login from "./Login/Login";
import { useLoginRef } from "../../redux/actions/postRefLoginActions";
import ResetPasswordMain from "./ResetPassword/ResetPasswordMain";
import EmailLinkSent from "./ResetPassword/EmailLinkSent";
import ExtraSecurity from "./ResetPassword/ExtraSecurity";
import PhoneCodeSent from "./ResetPassword/PhoneCodeSent";
import SetNewPassword from "./ResetPassword/SetNewPassword";
import PropTypes from "prop-types";
import ResetPasswordSuccess from "./ResetPassword/ResetPasswordSuccess";

 const RenderResetPassword = (props) => {
   return (
     <>
      <Route
        path={`/reset-password/email`}
        render={(props) => <ResetPasswordMain {...props} />}
      />
      <Route
        exact
        path="/reset-password/email-link-sent"
        render={(props) => <EmailLinkSent {...props} />}
      />
      <Route
        path="/reset-password/extra-security"
        render={(props) => <ExtraSecurity {...props} />}
      />
      <Route
         path="/reset-password/phone-code-sent"
         render={(props) => <PhoneCodeSent {...props} />}
       />
       <Route
         path="/reset-password/set-new-password"
         render={(props) => <SetNewPassword {...props} />}
       />
        <Route
          exact
          path="/reset-password/success"
          render={(props) => <ResetPasswordSuccess {...props} />}
       />
     </>
   )
 };

const RenderLogin = (props) => {
  const dispatch = useDispatch();
  const ref = useSelector((state) => state.login.ref);
  const next_url = useSelector((state) => state.config.next_url);
  const errorMessage = useSelector((state) => state.notifications.errors);
  useEffect(() => {
    // dispatch action when next_url is available and no error message
    errorMessage.length === 0 && next_url !== null
      ? dispatch(useLoginRef(ref))
      : undefined;
  }, [next_url]);
  return <Route path={`/login/`} render={(props) => <Login {...props} />} />;
};

class LoginApp extends Component {
  state = {
    urlCode: "",
    url: "",
  };

  componentDidMount() {
    const url = this.props.location.pathname;
    const urlCode = url.split("/").reverse()[0];
    this.setState(() => ({
      urlCode: urlCode,
      url: url,
    }));
  }

  render() {
    return (
      <div id="content" className="horizontal-content-margin">
        {this.state.url.includes("/login/") && <RenderLogin {...this.props} />}
        <RenderResetPassword {...this.props} />
      </div>
    );
  }
}

LoginApp.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }),
};

export default withRouter(LoginApp);

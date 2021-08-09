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
import ExtraSecurityToken from "./ResetPassword/ExtraSecurityToken";
import PropTypes from "prop-types";

 const RenderResetPassword = (props) => {
   const { urlCode } = props;
   return (
     <>
      <Route
        exact
        path="/reset-password/"
        render={(props) => <ResetPasswordMain urlCode={urlCode} {...props} />}
      />
      <Route
        exact
        path="/reset-password/email-link-sent"
        render={(props) => <EmailLinkSent {...props} />}
      />
      <Route
        exact
        path="/reset-password/extra-security"
        render={(props) => <ExtraSecurity {...props} />}
      />
      <Route
         exact
         path="/reset-password/phone-code-sent"
         render={(props) => <PhoneCodeSent {...props} />}
       />
        <Route
         exact
         path="/reset-password/security-key"
         render={(props) => <ExtraSecurityToken {...props} />}
       />
       <Route
         exact
         path="/reset-password/set-new-password"
         render={(props) => <SetNewPassword {...props} />}
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
      <div id="content" className="vertical-content-margin">
        {this.state.url.includes("/login/") && <RenderLogin {...this.props} />}
        <RenderResetPassword urlCode={this.state.urlCode} {...this.props} />
      </div>
    );
  }
}

LoginApp.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }),
};

export default withRouter(LoginApp);

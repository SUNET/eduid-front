/* eslint-disable */
import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import Login from "./Login/Login";
import { useLoginRef } from "../../redux/actions/postRefLoginActions";
import ResetPasswordForm from "./ResetPassword/ResetPasswordForm";
 import EmailLinkSent from "./ResetPassword/EmailLinkSent";
import ExtraSecurity from "./ResetPassword/ExtraSecurity";
import SetNewPassword from "./ResetPassword/SetNewPassword";

 const RenderResetPassword = (props) => {
   const { urlCode } = props;
   return (
     <>
       <Route
         exact
         path="/reset-password/"
         render={(props) => (
           <ResetPasswordForm urlCode={urlCode} {...props} />
         )}
       />
       <Route
         exact
         path="/reset-password/email-link-sent"
         render={(props) => (
           <EmailLinkSent {...props} />
         )}
       />
       <Route
         exact
         path="/reset-password/extra-security"
         render={(props) => (
           <ExtraSecurity {...props} />
         )}
       />
       <Route
         exact
         path="/reset-password/set-new-password"
         render={(props) => (
           <SetNewPassword {...props} />
         )}
       />
     </>
   )
 };

const RenderLogin = (props) => {
  const dispatch = useDispatch();
  const ref = useSelector((state) => state.login.ref);
  const next_url = useSelector((state) => state.config.next_url);
  // dispatch action when next_url is available
  useEffect(() => {
    dispatch(useLoginRef(ref));
  }, [next_url]);
  return (
    <Route
      exact
      path={`/login/${ref}`}
      render={(props) => <Login {...props} />}
    />
  );
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
    // all these paths need need to render the ResetPassword component, which in turn handles the logic of what is displayed at each path
    // const resetPasswordPaths = [
    //   "/reset-password/email-link-sent",
    //   "/reset-password/verify-email",
    //   "/reset-password/new-password",
    //   "/reset-password/extra-security-phone",
    //   "/reset-password/new-password-extra-security-phone",
    //   "/reset-password/new-password-extra-security-token",
    // ];

    // // creates a series of routes using all of the paths above
    // let resetPasswordPages = resetPasswordPaths.map((path, i) => {
    //   return (
    //     <Route
    //       key={i}
    //       exact
    //       path={path}
    //       render={(props) => <ResetPasswordMain {...props} />}
    //     />
    //   );
    // });

    return (
      <div id="content" className="vertical-content-margin">
        {this.state.url.includes("/login/") && (
          <RenderLogin urlCode={this.state.urlCode} {...this.props} />
        )}
        {/* <Route
          exact
          path="/reset-password/"
          render={(props) => (
            <ResetPasswordMain urlCode={this.state.urlCode} {...props} />
          )}
        /> */}
        <RenderResetPassword urlCode={this.state.urlCode} {...this.props}/>
        {/* {resetPasswordPages} */}
      </div>
    );
  }
}

LoginApp.propTypes = {};

export default withRouter(LoginApp);

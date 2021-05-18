import React, { Component } from "react";
import LoginForm from "./LoginForm/LoginForm_container";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ResetPasswordMain from "./ResetPassword/ResetPasswordMain";

class LoginApp extends Component {
  render() {
    // all these paths need need to render the ResetPassword component, which in turn handles the logic of what is displayed at each path
    const resetPasswordPaths = [
      "/reset-password/email-link-sent",
      "/reset-password/verify-email",
      "/reset-password/new-password",
      "/reset-password/extra-security-phone",
      "/reset-password/new-password-extra-security-phone",
      "/reset-password/new-password-extra-security-token",
    ];

    // creates a series of routes using all of the paths above
    let resetPasswordPages = resetPasswordPaths.map((path, i) => {
      return (
        <Route
          key={i}
          exact
          path={path}
          render={(props) => <ResetPasswordMain {...props} />}
        />
      );
    });

    return (
      <div id="content" className="vertical-content-margin">
        <Route
          exact
          path="/login/"
          render={(props) => <LoginForm {...props} />}
        />
        <Route
          exact
          path="/reset-password/"
          component={ResetPasswordMain}
        />
        {resetPasswordPages}
      </div>
    );
  }
}

LoginApp.propTypes = {
};

export default withRouter(LoginApp);

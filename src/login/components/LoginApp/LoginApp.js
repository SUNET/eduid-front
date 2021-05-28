import React, { Component } from "react";
import Login from "./Login/Login_container";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ResetPasswordMain from "./ResetPassword/ResetPasswordMain";

const RenderLogin = (props) => {
  const urlCode = props.url.split("/").reverse()[0];
  return (
    <Route
      exact
      path={`/login/${urlCode}`}
      render={(props) => <Login {...props} />}
    />
  );
};

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
    const url = this.props.location.pathname;
    return (
      <div id="content" className="vertical-content-margin">
        {url.includes("/login/") && <RenderLogin {...this.props} url={url} />}
        <Route exact path="/reset-password/" component={ResetPasswordMain} />
        {resetPasswordPages}
      </div>
    );
  }
}

LoginApp.propTypes = {};

export default withRouter(LoginApp);

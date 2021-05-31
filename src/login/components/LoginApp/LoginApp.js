import React, { Component } from "react";
import Login from "./Login/Login";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ResetPasswordMain from "./ResetPassword/ResetPasswordMain";

const RenderLogin = (props) => {
  const { urlCode } = props;
  return (
    <Route
      exact
      path={`/login/${urlCode}`}
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
        {this.state.url.includes("/login/") && (
          <RenderLogin urlCode={this.state.urlCode} {...this.props} />
        )}
        <Route
          exact
          path="/reset-password/"
          render={(props) => (
            <ResetPasswordMain urlCode={this.state.urlCode} {...props} />
          )}
        />
        {resetPasswordPages}
      </div>
    );
  }
}

LoginApp.propTypes = {};

export default withRouter(LoginApp);

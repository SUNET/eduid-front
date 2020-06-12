import React, { Component } from "react";
// import PropTypes from "prop-types";
import LoginForm from "./LoginForm/LoginForm_container";
import ResetPassword from "./ResetPassword/ResetPassword_container";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

class LoginApp extends Component {
  render() {
    // all these paths need need to render the ResetPassword component, which in turn handles the logic of what is displayed at each path
    const resetPasswordPaths = [
      "/reset/reset-password/get-email-link",
      "/reset/reset-password/email-link-sent",
      "/reset/reset-password/check-user-details",
      "/reset/reset-password/get-confirmation-code",
      "/reset/reset-password/use-confirmation-code",
      "/reset/reset-password/set-new-password"
    ];

    // creates a series of routes using all of the paths above
    let resetPasswordPages = resetPasswordPaths.map((path, i) => {
      return (
        <Route
          key={i}
          exact
          path={path}
          render={props => <ResetPassword {...props} />}
        />
      );
    });

    return (
      <div id="content">
        <Route
          exact
          path="/login/"
          render={props => <LoginForm {...props} />}
        />
        <Route
          exact
          path="/reset/reset-password/"
          component={() => (
            <Redirect to="/reset/reset-password/get-email-link" />
          )}
        />
        {resetPasswordPages}
      </div>
    );
  }
}

LoginApp.propTypes = {
  //is_fetching: PropTypes.bool,
};

export default withRouter(LoginApp);

import React, { Component } from "react";
// import PropTypes from "prop-types";
// import LoginForm from "../LoginForm/LoginForm_container";
import LoginForm from "./LoginForm/LoginForm_container";
import ResetPassword from "./ResetPassword/ResetPassword";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

class LoginApp extends Component {
  render() {
    return (
      <div className="horizontal-content-margin">
        <Route
          exact
          path="/login/"
          render={() => <LoginForm {...this.props} />}
        />
        <Route
          exact
          path="/reset/reset-password/"
          component={() => (
            <Redirect to="/reset/reset-password/get-email-link" />
          )}
        />
        <Route
          exact
          path="/reset/reset-password/get-email-link"
          render={props => <ResetPassword {...props} />}
        />
        <Route
          exact
          path="/reset/reset-password/email-link-sent"
          render={props => <ResetPassword {...props} />}
        />
      </div>
    );
  }
}

LoginApp.propTypes = {
  //is_fetching: PropTypes.bool,
};

export default withRouter(LoginApp);

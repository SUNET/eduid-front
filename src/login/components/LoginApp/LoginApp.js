import React, { Component } from "react";
import LoginForm from "./LoginForm/LoginForm_container";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

class LoginApp extends Component {
  render() {
    return (
      <div id="content" className="vertical-content-margin">
        <Route
          exact
          path="/login/"
          render={(props) => <LoginForm {...props} />}
        />
      </div>
    );
  }
}

export default withRouter(LoginApp);

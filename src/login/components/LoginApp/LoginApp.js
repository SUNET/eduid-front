import React, { Component } from "react";
import LoginForm from "./LoginForm/LoginForm_container";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

class LoginApp extends Component {
  render() {
    const url = this.props.location.pathname;
    const urlCode = url.split("/").reverse()[0];

    return (
      <div id="content" className="vertical-content-margin">
        <Route
          exact
          path={`/login/${urlCode}`}
          render={(props) => <LoginForm {...props} />}
        />
      </div>
    );
  }
}

export default withRouter(LoginApp);

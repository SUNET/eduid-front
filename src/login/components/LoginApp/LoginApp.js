import React, { Component } from "react";
import Login from "./Login/Login";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ResetPasswordForm from "./ResetPassword/ResetPasswordForm";
import EmailLinkSent from "./ResetPassword/EmailLinkSent";

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
    </>
  )
};

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
    return (
      <div id="content" className="vertical-content-margin">
        {this.state.url.includes("/login/") && (
          <RenderLogin urlCode={this.state.urlCode} {...this.props} />
        )}
        <RenderResetPassword urlCode={this.state.urlCode} {...this.props}/>
      </div>
    );
  }
}

LoginApp.propTypes = {};

export default withRouter(LoginApp);

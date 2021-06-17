/* eslint-disable */
import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import Login from "./Login/Login";
import { useLoginRef } from "../../redux/actions/postRefLoginActions";
import ResetPasswordForm from "./ResetPassword/ResetPasswordForm";
import EmailLinkSent from "./ResetPassword/EmailLinkSent";
import PropTypes from "prop-types";

const RenderResetPassword = (props) => {
  const { urlCode } = props;
  return (
    <>
      <Route
        exact
        path="/reset-password/"
        render={(props) => <ResetPasswordForm urlCode={urlCode} {...props} />}
      />
      <Route
        exact
        path="/reset-password/email-link-sent"
        render={(props) => <EmailLinkSent {...props} />}
      />
    </>
  );
};

const RenderLogin = (props) => {
  const dispatch = useDispatch();
  const ref = useSelector((state) => state.login.ref);
  const next_url = useSelector((state) => state.config.next_url);
  // dispatch action when next_url is available
  useEffect(() => {
    dispatch(useLoginRef(ref));
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

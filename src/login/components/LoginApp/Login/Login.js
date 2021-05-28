import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import LoginForm from "./LoginForm";

let RenderRegisterInfo = () => (
  <p>
    If you dont have eduID you can register
    <Link
      className={"text-link"}
      href={`https://dashboard.eduid.se/`}
      text={"here"}
    />
    .
  </p>
);

let Login = (props) => (
  <Fragment>
    <p className="heading">Login to your eduID</p>
    <LoginForm {...props} />
    <RenderRegisterInfo />
    <LinkRedirect
      exact
      id={"link-forgot-password"}
      className={""}
      to={`/reset-password/`}
      text={"Set a new password"}
    />
  </Fragment>
);

Login.propTypes = {
  translate: PropTypes.func,
  validate: PropTypes.func,
};

export default withRouter(Login);

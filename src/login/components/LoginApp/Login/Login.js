import React, { Fragment } from "react";
import PropTypes from "prop-types";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import LoginForm from "./LoginForm";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let RenderRegisterLink = () => (
  <p>
    Don't have eduID?
    <Link
      className={"text-link"}
      href={`https://signup.eduid.se/`}
      text={"Register here"}
    />
  </p>
);

let RenderResetPasswordLink = () => (
  <LinkRedirect
    exact
    id={"link-forgot-password"}
    className={""}
    to={`/reset-password/`}
    text={"Set a new password"}
  />
);

let Login = (props) => (
  <Fragment>
    <p className="heading">Log in</p>
    <LoginForm {...props} />
    <RenderRegisterLink />
    <RenderResetPasswordLink />
  </Fragment>
);

Login.propTypes = {
  translate: PropTypes.func,
  validate: PropTypes.func,
};

export default InjectIntl(Login);

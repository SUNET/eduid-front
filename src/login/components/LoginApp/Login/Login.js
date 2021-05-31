import React, { Fragment } from "react";
import PropTypes from "prop-types";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import LoginForm from "./LoginForm";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import ButtonPrimary from "../../Buttons/ButtonPrimary";

const RenderRegisterLink = () => (
  <p>
    Don&apos;t have eduID?
    <Link
      className={"text-link"}
      href={`https://signup.eduid.se/`}
      text={"Register here."}
    />
  </p>
);

const RenderResetPasswordLink = () => (
  <LinkRedirect
    exact
    id={"link-forgot-password"}
    className={""}
    to={`/reset-password/`}
    text={"Forgot your password?"}
  />
);

const Login = (props) => (
  <Fragment>
    <p className="heading">Log in</p>
    <div>
      <LoginForm {...props} />
      <RenderResetPasswordLink />
      <div>
        <ButtonPrimary
          type={"submit"}
          onClick={() => {}}
          id={""}
          className={"settings-button"}
        >
          Log in
        </ButtonPrimary>
      </div>
    </div>
    <RenderRegisterLink />
  </Fragment>
);

Login.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(Login);

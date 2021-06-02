import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import LoginForm from "./LoginForm";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import ButtonPrimary from "../../Buttons/ButtonPrimary";

const RenderRegisterLink = () => (
  <p className="secondary-link">
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

const Login = (props) => {
  const page = useSelector((state) => state.login.next_page);
  return (
    <Fragment>
      {page === "USERNAMEPASSWORD" ? (
        <div className="login">
          <p className="heading">Log in</p>
          <LoginForm {...props} />
          <div className="button-pair">
            <RenderResetPasswordLink />
            <ButtonPrimary
              type={"submit"}
              onClick={() => {}}
              id={""}
              className={"settings-button"}
            >
              Log in
            </ButtonPrimary>
          </div>
          <RenderRegisterLink />
        </div>
      ) : (
        <p className="heading">Loading</p>
      )}
    </Fragment>
  );
};

Login.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(Login);

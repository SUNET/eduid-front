import React, { Fragment } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import LoginForm from "./LoginForm";

// import EmailForm from "../../GroupManagement/EmailForm";
// import PasswordFormMock from "../../GroupManagement/GroupNameForm";
// import ButtonPrimary from "../../Buttons/ButtonPrimary";
// import { validate } from "../../../app_utils/validation/validateEmail";

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

let Login = (props) => {
  return (
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
};

Login.propTypes = {
  translate: PropTypes.func,
  validate: PropTypes.func,
};

export default withRouter(Login);

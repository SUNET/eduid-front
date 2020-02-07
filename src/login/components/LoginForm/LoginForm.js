import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "../Input.js";
import Link from "../Link.js";

class LoginForm extends React.Component {
  render() {
    // console.log("these are props in LoginForm:", this.props);
    return (
      <div className="text-margin">
        <p className="sub-heading">Login to your eduID</p>
        <div>
          <form id="login-form" className="form" method="POST">
            <Input
              inputId={"email-input"}
              inputClass={"input"}
              label={"Email"}
              name={"email-address"}
              placeholder={"example@email.com"}
              // onChange={this.props}
            />
            <Input
              inputId={"password-input"}
              inputClass={"password-input"}
              label={"Password"}
              name={"password"}
              placeholder={"Write your password"}
              // onChange={this.props}
            />
            <div className="form-button-pair">
              <button
                form="login-form"
                value="Submit"
                onClick={this.props.handleSubmit}
              >
                Login
              </button>
              <Link
                id={"link-forgot-password"}
                class={""}
                href={"https://dashboard.eduid.se/"}
                text={"Forgot your password?"}
              />
            </div>
          </form>
        </div>
        <p>
          If you dont have eduID you can register
          <Link
            className={"text-link"}
            href={"https://dashboard.eduid.se/"}
            text={"here"}
          />
        </p>
      </div>
    );
  }
}

LoginForm.propTypes = {
  //is_fetching: PropTypes.bool,
};

export default LoginForm;

import React, { Component } from "react";
// import PropTypes from "prop-types";
// import LoginForm from "../LoginForm/LoginForm_container";
import LoginForm from "../LoginForm/LoginForm_container";
import { Route } from "react-router-dom";

class LoginRoutes extends Component {
  render() {
    return (
      <div className="horizontal-content-margin">
        {/* <p className="sub-heading">Login to your eduID</p> */}
        <Route
          exact
          path="/login/"
          render={() => <LoginForm {...this.props} />}
        />
        {/* <Route
          path="/reset-password/get-reset-email/"
          component={ResetPassword}
        /> */}
        {/* <LoginForm /> */}
        {/* <p>
          If you dont have eduID you can register
          <Link
            className={"text-link"}
            href={"https://dashboard.eduid.se/"}
            text={"here"}
          />
        </p> */}
      </div>
    );
  }
}

LoginRoutes.propTypes = {
  //is_fetching: PropTypes.bool,
};

export default LoginRoutes;

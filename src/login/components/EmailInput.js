


import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { Field, reduxForm } from "redux-form";
// import { NavLink } from "react-router-dom";

import Input from "../Input";
// import LinkRedirect from "../LinkRedirect";
// import Link from "../Link";
// import ButtonPrimary from "../ButtonPrimary";
import { withRouter } from "react-router-dom";

// import { validate } from "../../app_utils/validation/validateEmail";

let EmailInput = props => (
  // console.log("these are props in the LoginFormDetails:", props),
  // (
  <React.Fragment>
      type={"email"}
      name={"email"}
      label={"email address"}
      inputclass={"input"}
      id={"email-input"}
      component={Input}
      l10n={props.l10n}
      placeholder={"example@email.com"}
  </React.Fragment>
  // )
);

EmailInput.propTypes = {
  l10n: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default withRouter(EmailInput);

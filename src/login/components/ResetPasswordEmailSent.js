import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import EmailDisplay from "../../components/EmailDisplay";
import Link from "./Link";
// import EmailInput from "./EmailInput";
// import LinkRedirect from "./LinkRedirect";
// import ButtonPrimary from "./ButtonPrimary";

// import { validate } from "../app_utils/validation/validateEmail";

// let EmailForm = props => (
//   console.log("this is props in Email Form", props),
//   (
//     <form id="reset-password-email-form" className="form">
//       <EmailInput />
//       <LinkRedirect
//         id={"link-forgot-password"}
//         className={""}
//         to={`/reset/reset-password/email-link-sent`}
//         text={"Set a new password"}>
//         <ButtonPrimary
//           id={"register-button"}
//           disabled={props.invalid}
//           onClick={props.handleLogin}
//         >
//           Send me a link
//         </ButtonPrimary>
//       </LinkRedirect>
//     </form>
//   )
// );

// EmailForm = reduxForm({
//   form: "email-form",
//   validate
// })(EmailForm);

// EmailForm = connect(state => ({
//   enableReinitialize: true
// }))(EmailForm);

class ResetPasswordEmailSent extends Component {
  render() {
    return (
      <React.Fragment>
        <EmailDisplay />
        <Link>I did not recieve a link.</Link>
      </React.Fragment>
    );
  }
}

ResetPasswordEmailSent.propTypes = {
  l10n: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default withRouter(ResetPasswordEmailSent);

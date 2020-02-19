import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import EmailDisplay from "../../../../components/EmailDisplay";
import Link from "../../Link";
// import EmailInput from "./EmailInput";
// import LinkRedirect from "./LinkRedirect";
// import ButtonPrimary from "./ButtonPrimary";

class EmailSent extends Component {
  render() {
    console.log("these are the props in EmailSent:", this.props);
    return (
      <React.Fragment>
        <EmailDisplay {...this.props} />
        <Link>I did not recieve a link.</Link>
      </React.Fragment>
    );
  }
}

EmailSent.propTypes = {
  l10n: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default withRouter(EmailSent);

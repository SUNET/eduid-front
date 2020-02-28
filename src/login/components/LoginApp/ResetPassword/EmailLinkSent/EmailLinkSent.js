import React, { Component } from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import EmailDisplay from "../../../DataDisplay/Email/EmailDisplay_container";
import ButtonSecondary from "../../../Buttons/ButtonSecondary";


class EmailLinkSent extends Component {
  render() {
    // console.log("these are the props in EmailSent:", this.props);
    return (
      <React.Fragment>
        <EmailDisplay {...this.props} />
        <div className="button-single">
          <p>
            <span className="sub-heading"> No link in your email inbox?</span>
            Request another one here. It is valid for up to two hours, so make
            sure you are looking at the most recent email.
          </p>
          <ButtonSecondary
            id={"resend-email-link"}
            onClick={this.props.handleResendLink}
          >
            Send me a new link to this email address
          </ButtonSecondary>
        </div>
      </React.Fragment>
    );
  }
}

EmailLinkSent.propTypes = {
  l10n: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default withRouter(EmailLinkSent);

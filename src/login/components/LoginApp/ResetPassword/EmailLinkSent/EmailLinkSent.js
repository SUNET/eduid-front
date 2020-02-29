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
          <div>
            {/* <span key="0" className="sub-heading">
              No link in your email inbox?
            </span> */}
            <p key="1">
              If you did not get a link you can request another one. It will be
              valid for up to two hours.
            </p>
          </div>
          <ButtonSecondary
            id={"resend-email-link"}
            onClick={this.props.handleResendLink}
          >
            Send a new link
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

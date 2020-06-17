import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// to access redirect from LoginApp and for translation
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../../translation/InjectIntl_HOC_factory";

class SetNewPassword extends Component {
  render() {
    console.log("these are props in the resetpassword:", this.props);
    console.log(
      "these are props in the resetpassword:",
      this.props.extra_security
    );

    return (
      <Fragment>
        <p>this is info about password reset</p>
      </Fragment>
    );
  }
}

SetNewPassword.propTypes = {
  translate: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func,
};

export default InjectIntl(withRouter(SetNewPassword));

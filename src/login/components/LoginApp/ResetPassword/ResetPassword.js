import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

class ResetPassword extends Component {
  render() {
    return (
      <>
        
      </>
    );
  }
}

ResetPassword.propTypes = {
  translate: PropTypes.func,
  validate: PropTypes.func,
};

export default InjectIntl(withRouter(ResetPassword));

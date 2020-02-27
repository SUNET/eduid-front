import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// import i18n from "InjectIntl_HOC_factory";

// import "./Resetting.scss";

class GetEmailCode extends Component {
  render() {
    // console.log("these are the props in EmailSent:", this.props);
    return (
      <React.Fragment>
        <h3 className="reset-password-code-header">
          this is the confirmation code page
          {this.props.translate("resetpw.code_title")}
        </h3>
      </React.Fragment>
    );
  }
}

GetEmailCode.propTypes = {};

export default withRouter(GetEmailCode);

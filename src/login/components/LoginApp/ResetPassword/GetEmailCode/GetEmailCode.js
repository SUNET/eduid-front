import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import i18n from "InjectIntl_HOC_factory";

// import "./Resetting.scss";

class GetEmailCode extends Component {
  render() {
    return (
      <div>
        <h3 className="reset-password-code-header">
          {this.props.translate("resetpw.code_title")}
        </h3>
      </div>
    );
  }
}

GetEmailCode.propTypes = {};

export default withRouter(GetEmailCode);


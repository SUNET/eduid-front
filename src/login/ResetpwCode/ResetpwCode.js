import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "i18n-messages";

import "./ResetPassword.scss";

import CodeFormContainer from "login/ResetpwCodeForm/ResetpwCodeForm_container";


class ResetpwCode extends Component {

  render() {
    return (
      <div>
        <h3 className="reset-password-code-header">
          {this.props.l10n("resetpw.code_title")}
        </h3>
        <CodeFormContainer />
      </div>
    );
  }
}

ResetpwCode.propTypes = {
};

export default ResetpwCode;

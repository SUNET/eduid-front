import React, { Component } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

class WizardPanel extends Component {
  render() {
    return (
      <div className="wizard">
        <p>Create your first group</p>
      </div>
    );
  }
}

WizardPanel.propTypes = {};

export default InjectIntl(WizardPanel);

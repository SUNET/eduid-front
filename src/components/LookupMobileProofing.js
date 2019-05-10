import React, { Component } from "react";
import PropTypes from "prop-types";
import FormText from "reactstrap/lib/FormText";

import EduIDButton from "components/EduIDButton";

import "style/LookupMobileProofing.scss";

class LookupMobileProofing extends Component {
  render() {
    return (
      <div>
        <form
          id="lookup-mobile-proofing-form"
          className="form-horizontal"
          role="form"
        >
          <fieldset id="lookup-mobile-proofing">
            <EduIDButton
              className="proofing-button"
              disabled={this.props.disabled}
              onClick={this.props.handleLookupMobile}
              block
            >
              {this.props.l10n("lmp.confirm-lookup-mobile")}
            </EduIDButton>
            <FormText className="proofing-btn-help" color="muted">
              {this.props.l10n("lmp.initialize_proofing_help_text")}
            </FormText>
          </fieldset>
        </form>
      </div>
    );
  }
}

LookupMobileProofing.propTypes = {
  disabled: PropTypes.bool,
  handleLookupMobile: PropTypes.func
};

export default LookupMobileProofing;

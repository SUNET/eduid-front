import React, { Component } from "react";
import PropTypes from "prop-types";
import FormText from "reactstrap/lib/FormText";

import EduIDButton from "components/EduIDButton";
import ConfirmModal from "components/ConfirmModal";
import GenericConfirmModal from "components/GenericConfirmModal";
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
        <GenericConfirmModal
          modalId="letterGenericConfirmDialog"
          title={this.props.l10n("letter.confirm_title")}
          mainText={this.props.l10n("letter.confirm_info")}
          showModal={true}
          closeModal={this.props.handleStopConfirmationLetter}
          acceptModal={this.props.confirmLetterProofing}
        />
        {/* <ConfirmModal
          modalId="letterConfirmDialog"
          id="letterConfirmDialogControl"
          title={this.props.l10n("letter.verify_title")}
          resendLabel={this.props.l10n("cm.enter_code")}
          placeholder={this.props.l10n("letter.placeholder")}
          showModal={this.props.verifyingLetter}
          // closeModal={this.props.handleStopVerificationLetter}
          // handleConfirm={this.props.sendConfirmationCode}
          // with_resend_link={false}
        /> */}
      </div>
    );
  }
}

LookupMobileProofing.propTypes = {
  disabled: PropTypes.bool,
  handleLookupMobile: PropTypes.func
};

export default LookupMobileProofing;

import React, { Component } from "react";
import PropTypes from "prop-types";

import ConfirmModal from "components/ConfirmModal";
import GenericConfirmModal from "components/GenericConfirmModal";

import "style/LetterProofing.scss";

class LetterProofingButton extends Component {
  render() {
    return (
      <div>
        <div className="vetting-button">
          <button
            className="proofing-button"
            onClick={this.props.handleLetterProofing}
          >
            <div className="vetting-button-text">
              {this.props.l10n("verify-identity.vetting_post_tagline")}
            </div>
            <div className="vetting-button-name">
              {this.props.l10n("letter.button_text_request")}
            </div>
          </button>
        </div>
        <GenericConfirmModal
          modalId="letterGenericConfirmDialog"
          title={this.props.l10n("letter.modal_confirm_title")}
          mainText={this.props.l10n("letter.modal_confirm_info")}
          showModal={this.props.confirmingLetter}
          closeModal={this.props.handleStopConfirmationLetter}
          acceptModal={this.props.confirmLetterProofing}
        />
        <ConfirmModal
          modalId="letterConfirmDialog"
          id="letterConfirmDialogControl"
          title={this.props.l10n("letter.verify_title")}
          resendLabel={this.props.l10n("cm.enter_code")}
          placeholder={this.props.l10n("letter.placeholder")}
          showModal={this.props.verifyingLetter}
          closeModal={this.props.handleStopVerificationLetter}
          handleConfirm={this.props.sendConfirmationCode}
          with_resend_link={false}
        />
      </div>
    );
  }
}

LetterProofingButton.propTypes = {
  confirmingLetter: PropTypes.bool,
  sendConfirmationCode: PropTypes.func,
  handleLetterProofing: PropTypes.func,
  confirmLetterProofing: PropTypes.func,
  handleStopConfirmationLetter: PropTypes.func
};

export default LetterProofingButton;

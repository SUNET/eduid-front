import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormText } from "reactstrap";

import EduIDButton from "components/EduIDButton";
import ConfirmModal from "components/ConfirmModal";
import GenericConfirmModal from "components/GenericConfirmModal";

import "style/LetterProofing.scss";

class LetterProofingButton extends Component {
  render() {
    return (
      <div>
        <form id="letter-proofing-form" className="form-horizontal" role="form">
          <fieldset id="letter-proofing">
            <EduIDButton
              className="proofing-button"
              disabled={this.props.disabled}
              onClick={this.props.handleLetterProofing}
              block
            >
              {this.props.l10n("letter.letter_button_text")}
            </EduIDButton>
            <FormText className="proofing-btn-help" color="muted">
              {this.props.l10n("letter.initialize_proofing_help_text")}
            </FormText>
          </fieldset>
        </form>
        <GenericConfirmModal
          modalId="letterGenericConfirmDialog"
          title={this.props.l10n("letter.confirm_title")}
          mainText={this.props.l10n("letter.confirm_info")}
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
  disabled: PropTypes.bool,
  confirmingLetter: PropTypes.bool,
  sendConfirmationCode: PropTypes.func,
  handleLetterProofing: PropTypes.func,
  confirmLetterProofing: PropTypes.func,
  handleStopConfirmationLetter: PropTypes.func
};

export default LetterProofingButton;

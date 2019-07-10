import React, { Component } from "react";
import PropTypes from "prop-types";
import FormText from "reactstrap/lib/FormText";

import EduIDButton from "components/EduIDButton";
import ConfirmModal from "components/ConfirmModal";
import GenericConfirmModal from "components/GenericConfirmModal";

import "style/LetterProofing.scss";

class LetterProofingButton extends Component {
  render() {
    // let buttonText = "";
    // if (!this.props.confirmingLetter) {
    //   buttonText = this.props.l10n("letter.button_text_code");
    // } else {
    //   buttonText = this.props.l10n("letter.button_text_request");
    // }
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
              {this.props.l10n("letter.button_text_request")}
            </EduIDButton>
          
            <FormText className="proofing-btn-help" color="muted">
             {this.props.l10n("letter.initialize_proofing_help_text")}
          
              {/* <ul>
                <li>
                  {this.props.l10n(
                    "letter.initialize_proofing_help_text_step_1"
                  )}
                </li>
                <li>
                  {this.props.l10n(
                    "letter.initialize_proofing_help_text_step_2"
                  )}
                </li>
              </ul>
              <label>
                {this.props.l10n("letter.initialize_proofing_help_text_tip_1")}
              </label> */}
            </FormText>
            <label>
              {this.props.l10n("letter.initialize_proofing_help_text_tip_1")}
            </label>
          </fieldset>
        </form>
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
  disabled: PropTypes.bool,
  confirmingLetter: PropTypes.bool,
  sendConfirmationCode: PropTypes.func,
  handleLetterProofing: PropTypes.func,
  confirmLetterProofing: PropTypes.func,
  handleStopConfirmationLetter: PropTypes.func
};

export default LetterProofingButton;

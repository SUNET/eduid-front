import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationModal from "../login/components/Modals/NotificationModal";
import ConfirmModal from "../containers/ConfirmModal";
class LetterProofingButton extends Component {
  render() {
    const { disabled } = this.props;
    return (
      <div>
        <div className="vetting-button">
          <button
            disabled={disabled}
            onClick={this.props.handleLetterProofing}
          >
            <div className="text">
              {this.props.translate("verify-identity.vetting_post_tagline")}
              { disabled &&
                <div className="text explanation">
                  {this.props.translate("verify-identity.vetting_post_tagline")}
                </div>
              }
            </div>
            <div className="name">
              {this.props.translate("letter.button_text_request")}
            </div>
          </button>
        </div>
        <NotificationModal
          modalId="letterGenericConfirmDialog"
          title={this.props.translate("letter.modal_confirm_title")}
          mainText={this.props.translate("letter.modal_confirm_info")}
          showModal={this.props.confirmingLetter}
          closeModal={this.props.handleStopConfirmationLetter}
          acceptModal={this.props.confirmLetterProofing}
        />
        <ConfirmModal
          modalId="letterConfirmDialog"
          id="letterConfirmDialogControl"
          title={this.props.translate("letter.verify_title")}
          resendLabel={this.props.translate("cm.enter_code")}
          placeholder={this.props.translate("letter.placeholder")}
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

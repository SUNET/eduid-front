import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationModal from "../login/components/Modals/NotificationModal";
import ConfirmModal from "../containers/ConfirmModal";
import { shortCodePattern } from "../login/app_utils/validation/regexPatterns";

class LetterProofingButton extends Component {
  state = {
    letter_expired: false,
    letter_expires: false,
    verifyingLetter: false,
    confirmingLetter: false,
    letter_sent: "",
  }
  
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
              { disabled ?
                <div className="text explanation">
                  {this.props.translate("verify-identity.vetting_explanation_add_nin")}
                </div>
                : !this.props.letter_sent==="" && this.props.letter_expired ? 
                ( 
                  <div className="text explanation">
                    KODEN GICK UT {this.props.letter_expires.slice(0,10)}<br />
                    TRYCK HÄR OM DU VILL BESTÄLLA EN NY KOD<br />
                  </div>
                ):(
                  <div className="text explanation">
                    ETT BREVET SKICKADES {this.props.letter_sent.slice(0,10)}<br />
                    BREVET ÄR GILTIG TILL{this.props.letter_expires.slice(0,10)}<br />
                    TRYCK HÄR IGEN NÄR DU HAR FÅTT BREVET<br />
                  </div>
                )
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
          // showModal={this.props.verifyingLetter}
          // closeModal={this.props.handleStopVerificationLetter}
          handleConfirm={this.props.sendConfirmationCode}
          with_resend_link={false}
          validationPattern={shortCodePattern}
          validationError={"confirmation.code_invalid_format"}
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

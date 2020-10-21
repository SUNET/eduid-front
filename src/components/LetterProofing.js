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

  handleModal=()=>{
    const { verifyingLetter, letter_expired, confirmingLetter } = this.props;
    this.setState({
      verifyingLetter: verifyingLetter,
      letter_expired: letter_expired,
      confirmingLetter: confirmingLetter
    })
  }

  sendConfirmationCode=(e)=>{
    this.props.sendConfirmationCode(e);
    this.setState({
      confirmingLetter: false,
      verifyingLetter: false
    })
  }

  render() {
    const { disabled } = this.props;
    let description = "";
    if(disabled){
      description = (
        <div className="description">
          {this.props.translate("verify-identity.vetting_explanation_add_nin")}
        </div> 
      )
    } else {
      if(this.props.letter_sent === ""){
        description = (
          <div />
        )
      }
      else if(this.props.letter_expire){
        description = (
          <div className="description">
            {this.props.translate("verify-identity.vetting_letter_code_expired")} {this.props.letter_expires.slice(0,10)}<br />
            {this.props.translate("verify-identity.vetting_letter_order_new_code")} <br />
          </div>
        )
      }
      else {
        description = (
          <div className="description">
            {this.props.translate("verify-identity.vetting_letter_sent")} {this.props.letter_sent.slice(0,10)}<br />
            {this.props.translate("verify-identity.vetting_letter_valid")} {this.props.letter_expires.slice(0,10)}<br />
            {this.props.translate("verify-identity.vetting_letter_received")} <br />
          </div>
        )
      }
    }
    return (
      <div>
        <div className="vetting-button">
          <button
            disabled={disabled}
            onClick={()=>this.handleModal()}
          >
            <div className="text">
              {this.props.translate("verify-identity.vetting_post_tagline")}
              {description}
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
          showModal={this.state.confirmingLetter}
          closeModal={()=>this.setState({confirmingLetter: false})}
          acceptModal={this.props.confirmLetterProofing}
        />
        <ConfirmModal
          modalId="letterConfirmDialog"
          id="letterConfirmDialogControl"
          title={this.props.translate("letter.verify_title")}
          resendLabel={this.props.translate("cm.enter_code")}
          placeholder={this.props.translate("letter.placeholder")}
          showModal={this.state.verifyingLetter}
          closeModal={()=>this.setState({verifyingLetter: false})}
          handleConfirm={this.sendConfirmationCode}
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

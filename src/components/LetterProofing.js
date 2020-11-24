import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationModal from "../login/components/Modals/NotificationModal";
import ConfirmModal from "../containers/ConfirmModal";
import { shortCodePattern } from "../login/app_utils/validation/regexPatterns";

class LetterProofingButton extends Component {
  state = {
    letter_expired: false,
    letter_expires_date: "",
    verifyingLetter_sent: false,
    confirmingLetter: false,
    letter_sent_date: ""
  }

  handleModal=()=>{
    this.setState({
      verifyingLetter_sent: this.props.verifyingLetter_sent,
      letter_expired: this.props.letter_expired,
      confirmingLetter: this.props.confirmingLetter,
      letter_sent_date: this.props.letter_sent_date,
      letter_expires_date: this.props.letter_expires_date
    })
  }

  sendConfirmationCode=(e)=>{
    this.props.sendConfirmationCode(e);
    this.closeConfirmationModal();
  }

  closeConfirmationModal=()=>{
    this.setState({
      verifyingLetter_sent: false
    })
  }

  confirmLetterProofing=(e)=>{
    this.props.confirmLetterProofing(e);
    this.closeNotificationModal();
  }

  closeNotificationModal=()=>{
    this.setState({
      letter_sent_date: "",
      confirmingLetter: false,
      letter_expires_date: ""
    })
  }

  formatDateFromBackend = dateFromBackend => {
    let newDate = new Date(dateFromBackend);
    return newDate.getFullYear()+'-' + (newDate.getMonth()+1) + '-'+newDate.getDate();
  }
  
  render() {
    const showNotificationModal = 
      (this.state.letter_sent_date === "" && this.state.confirmingLetter) ||
      (this.state.letter_expired && this.state.letter_sent_date !== "");
    const showConfirmationModal = 
      !this.state.letter_expired && this.state.letter_sent_date !== "" 
      &&!this.state.confirmingLetter && this.state.verifyingLetter_sent;
    let description = "";
    if(this.props.disabled){
      description = (
        <div className="description">
          {this.props.translate("verify-identity.vetting_explanation_add_nin")}
        </div> 
      )
    } else {
      if(this.props.letter_sent_date === ""){
        description = (
          <div />
        )
      }
      else if(this.props.letter_expired){
        description = (
          <>
            <div className="description">
              {this.props.translate("verify-identity.vetting_letter_code_expired")}
              {this.formatDateFromBackend(this.props.letter_expires_date)}
            </div>
            <div className="description">
              {this.props.translate("verify-identity.vetting_letter_order_new_code")}
            </div>
          </>
        )
      }
      else {
        description = (
          <>
            <div className="description">
              {this.props.translate("verify-identity.vetting_letter_sent")} 
              {this.formatDateFromBackend(this.props.letter_sent_date)}
            </div>
            <div className="description">
              {this.props.translate("verify-identity.vetting_letter_valid")} 
              {this.formatDateFromBackend(this.props.letter_expires_date)}
            </div>
            <div className="description">
              {this.props.translate("verify-identity.vetting_letter_received")}
            </div>
          </>
        )
      }
    }
    return (
      <div>
        <div className="vetting-button">
          <button
            disabled={this.props.disabled}
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
          showModal={showNotificationModal}
          closeModal={this.closeNotificationModal}
          acceptModal={this.confirmLetterProofing}
        />
        <ConfirmModal
          modalId="letterConfirmDialog"
          id="letterConfirmDialogControl"
          title={this.props.translate("letter.verify_title")}
          resendLabel={this.props.translate("cm.enter_code")}
          placeholder={this.props.translate("letter.placeholder")}
          showModal={showConfirmationModal}
          closeModal={this.closeConfirmationModal}
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

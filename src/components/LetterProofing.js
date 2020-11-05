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
    letter_sent_days_ago: 0
  }

  handleModal=()=>{
    const { 
      verifyingLetter, 
      letter_expired, 
      confirmingLetter, 
      letter_sent_days_ago, 
      letter_sent 
    } = this.props;
    this.setState({
      verifyingLetter: verifyingLetter,
      letter_expired: letter_expired,
      confirmingLetter: confirmingLetter,
      letter_sent_days_ago: letter_sent_days_ago,
      letter_sent: letter_sent
    })
  }

   sendConfirmationCode=(e)=>{
    this.props.sendConfirmationCode(e);
    this.setState({
      letter_sent_days_ago: 0, 
      verifyingLetter:false
    })
  }

  confirmLetterProofing=(e)=>{
    this.props.confirmLetterProofing(e);
    this.setState({
      letter_sent_days_ago: 0,
      verifyingLetter: true
    })
  }

  render() {
    const { disabled, translate, letter_sent, letter_expired, letter_expires } = this.props;
    let description = "";
    if(disabled){
      description = (
        <div className="description">
          {translate("verify-identity.vetting_explanation_add_nin")}
        </div> 
      )
    } else {
      if(letter_sent === ""){
        description = (
          <div />
        )
      }
      else if(letter_expired){
        description = (
          <>
            <div className="description">
              {translate("verify-identity.vetting_letter_code_expired")}
              {letter_expires.slice(0,10)}
            </div>
            <div className="description">
              {translate("verify-identity.vetting_letter_order_new_code")}
            </div>
          </>
        )
      }
      else {
        description = (
          <>
            <div className="description">
              {translate("verify-identity.vetting_letter_sent")} 
              {letter_sent.slice(0,10)}
            </div>
            <div className="description">
              {translate("verify-identity.vetting_letter_valid")} 
              {letter_expires.slice(0,10)}
            </div>
            <div className="description">
              {translate("verify-identity.vetting_letter_received")}
            </div>
          </>
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
              {translate("verify-identity.vetting_post_tagline")}
              {description}
            </div>
            <div className="name">
              {translate("letter.button_text_request")}
            </div>
          </button>
        </div>
        <NotificationModal
          modalId="letterGenericConfirmDialog"
          title={translate("letter.modal_confirm_title")}
          mainText={translate("letter.modal_confirm_info")}
          showModal={
            (this.state.letter_sent_days_ago===undefined && !this.state.verifyingLetter)
            ||(this.state.letter_expired && this.state.letter_sent_days_ago>=15)
          }
          closeModal={(prevState)=>this.setState({
            letter_sent_days_ago: prevState.letter_sent_days_ago,
            verifyingLetter: prevState.verifyingLetter
          })}
          acceptModal={this.confirmLetterProofing}
        />
        <ConfirmModal
          modalId="letterConfirmDialog"
          id="letterConfirmDialogControl"
          title={translate("letter.verify_title")}
          resendLabel={translate("cm.enter_code")}
          placeholder={translate("letter.placeholder")}
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

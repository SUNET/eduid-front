import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationModal from "../login/components/Modals/NotificationModal";

class LookupMobileProofing extends Component {
  render() {
    let description = "";
    if(this.props.withoutNin){
      description = (
        <div className="description">
          {this.props.translate("verify-identity.vetting_explanation_add_nin")}
        </div> 
      )
    } else if(this.props.withoutPhoneNumber){
      description = (
        <div className="description">
          {this.props.translate("verify-identity.vetting_explanation_add_phone_number")}
        </div> 
      )
    } else if(this.props.notVerified) {
      description = (
        <div className="description">
          {this.props.translate("verify-identity.vetting_explanation_confirm_phone_number")}
        </div> 
      ); 
    } else if(this.props.nonSweNumber) {
      description = (
        <div className="description">
          ONLY POSSIBLE WITH SWEDISH TELEPHONE NUMBER
        </div> 
      ); 
    } else {
      <div /> 
    }

    return (
      <div key="0">
        <div key="0" className="vetting-button">
          <button
            disabled={this.props.withoutNin || this.props.withoutPhoneNumber|| this.props.notVerified || this.props.nonSweNumber}
            onClick={this.props.handleShowModal}
          >
            <div key="1" className="text">
              {this.props.translate("verify-identity.vetting_phone_tagline")}
              {description}
            </div>
            <div key="2" className="name">
              {this.props.translate("lmp.button_text_request")}
            </div>
          </button>
        </div>
        <NotificationModal
          modalId="mobileGenericConfirmDialog"
          title={this.props.translate("lmp.modal_confirm_title")}
          mainText={this.props.translate("lmp.modal_confirm_info")}
          showModal={this.props.showModal}
          closeModal={this.props.handleCloseModal}
          acceptModal={this.props.handleLookupMobile}
        />
      </div>
    );
  }
}

LookupMobileProofing.propTypes = {
  handleLookupMobile: PropTypes.func,
};

export default LookupMobileProofing;

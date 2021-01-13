import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationModal from "../login/components/Modals/NotificationModal";
import { HashLink } from 'react-router-hash-link';
class LookupMobileProofing extends Component {  
  render() {
    const linkToSettings = (
      <HashLink
        key="1"
        to={"/profile/settings/#phone"}
      >
        {this.props.translate("verify-identity.vetting_link_settings")}
      </HashLink>
    );

    let explanationText = (
      <div className="explanation-link">
        { 
          this.props.withoutNin ? this.props.translate("verify-identity.vetting_explanation_add_nin") : 
          /* without phone number, description text will help the user to add phone number and the text "setting" is linked to the setting page phone number section */
          this.props.withoutPhoneNumber ? <> {this.props.translate("verify-identity.vetting_explanation_add_phone_number")} {linkToSettings}</> : 
          /* unverified phone number, description text will help the user to confirm phone number and the text "setting" is linked to the setting page phone number section */
          this.props.unverifiedNumber ? <> {this.props.translate("verify-identity.vetting_explanation_confirm_phone_number")} {linkToSettings}</> :
          /* the verified phone number is not a Swedish number, description text show "only avaiable with Swedish number" */
          this.props.nonSweNumber ? this.props.translate("verify-identity.vetting_explanation_only_available_swe_number") : null 
        }
      </div>
    )

    return (
      <div key="0">
        <div key="0" className="vetting-button"> 
          <button 
            disabled={this.props.withoutNin || this.props.withoutPhoneNumber|| this.props.unverifiedNumber || this.props.nonSweNumber}
            onClick={this.props.handleShowModal}
          >
            <div key="1" className="text">
              {this.props.translate("verify-identity.vetting_phone_tagline")}
              {explanationText}
            </div>
            <div key="2" className="name">
              {this.props.translate("lmp.button_text_request")}
            </div>
          </button>
        </div> 
        {/* notificationModal will only opens when user are able to verify identity by phone */}
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

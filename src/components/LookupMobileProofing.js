import React, { Component } from "react";
import PropTypes from "prop-types";
import NotificationModal from "../login/components/Modals/NotificationModal";

class LookupMobileProofing extends Component {
  render() {
    let modalPrompt = "";
    let primaryNumber = false;
    let phoneNumbers = this.props.phoneNumbers;

    // if there are phone numbers, check if one is primary   
    if (phoneNumbers !== []) {
      primaryNumber = phoneNumbers.some((num) => num.primary === true);
    } 

    if (phoneNumbers.length) {
      modalPrompt = [
        <NotificationModal
          key="0"
          modalId="mobileGenericConfirmDialog"
          title={this.props.translate("lmp.modal_reminder_to_confirm_title")}
          mainText={this.props.translate("lmp.modal_reminder_to_confirm_info")}
          showModal={this.props.showModal}
          closeModal={this.props.handleCloseModal}
          acceptModal={this.props.handleCloseModal}
          acceptButtonText={this.props.translate("cm.ok")}
        />,
      ];
      if (primaryNumber) {
        modalPrompt = [
          <NotificationModal
            key="0"
            modalId="mobileGenericConfirmDialog"
            title={this.props.translate("lmp.modal_confirm_title")}
            mainText={this.props.translate("lmp.modal_confirm_info")}
            showModal={this.props.showModal}
            closeModal={this.props.handleCloseModal}
            acceptModal={this.props.handleLookupMobile}
          />,
        ];
      }
    } else {
      modalPrompt = [
        <NotificationModal
          key="0"
          modalId="mobileGenericConfirmDialog"
          title={this.props.translate("lmp.modal_add_number_title")}
          mainText={this.props.translate("lmp.modal_add_number_info")}
          showModal={this.props.showModal}
          closeModal={this.props.handleCloseModal}
          acceptModal={this.props.handleCloseModal}
          acceptButtonText={this.props.translate("cm.ok")}
        />,
      ];
    }

    return (
      <div key="0">
        <div key="0" className="vetting-button">
          <button
            disabled={this.props.disabled}
            onClick={this.props.handleShowModal}
          >
            <div key="1" className="text">
              {this.props.translate("verify-identity.vetting_phone_tagline")}
            </div>
            <div key="2" className="name">
              {this.props.translate("lmp.button_text_request")}
            </div>
          </button>
        </div>
        {modalPrompt}
      </div>
    );
  }
}

LookupMobileProofing.propTypes = {
  handleLookupMobile: PropTypes.func,
};

export default LookupMobileProofing;

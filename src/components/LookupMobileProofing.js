import React, { Component } from "react";
import PropTypes from "prop-types";
import FormText from "reactstrap/lib/FormText";

import EduIDButton from "components/EduIDButton";
import ConfirmModal from "components/ConfirmModal";
import GenericConfirmModal from "components/GenericConfirmModal";
import "style/LookupMobileProofing.scss";

class LookupMobileProofing extends Component {
  render() {
    let modalPrompt = "";
    // let buttonText = "";
    // if (true) {
    //   buttonText = this.props.l10n("lmp.button_text_code");
    // } else {
    //   buttonText = this.props.l10n("lmp.button_text_request");
    // }

    if (this.props.phoneNumbers.length) {
      modalPrompt = [
        <GenericConfirmModal
          key="0"
          modalId="mobileGenericConfirmDialog"
          title={this.props.l10n("lmp.modal_reminder_to_confirm_title")}
          mainText={this.props.l10n("lmp.modal_reminder_to_confirm_info")}
          showModal={this.props.showModal}
          closeModal={this.props.handleCloseModal}
          acceptModal={this.props.handleCloseModal}
        />
      ];
      if (this.props.phoneNumbers[0].verified) {
        modalPrompt = [
          <GenericConfirmModal
            key="0"
            modalId="mobileGenericConfirmDialog"
            title={this.props.l10n("lmp.modal_confirm_title")}
            mainText={this.props.l10n("lmp.modal_confirm_info")}
            showModal={this.props.showModal}
            closeModal={this.props.handleCloseModal}
            acceptModal={this.props.handleLookupMobile}
          />
        ];
      }
    } else {
      modalPrompt = [
        <GenericConfirmModal
          key="0"
          modalId="mobileGenericConfirmDialog"
          title={this.props.l10n("lmp.modal_add_number_title")}
          mainText={this.props.l10n("lmp.modal_add_number_info")}
          showModal={this.props.showModal}
          closeModal={this.props.handleCloseModal}
          acceptModal={this.props.handleCloseModal}
        />
      ];
    }

    return (
      <div key="0">
        <div key="0" className="vetting-button">
          <button
            className="proofing-button"
            disabled={this.props.disabled}
            onClick={this.props.handleShowModal}
          >
            <div key="1" className="vetting-button-text">
              {this.props.l10n("verify-identity.vetting_phone_tagline")}
            </div>
            <div key="2" className="vetting-button-name">
              {this.props.l10n("lmp.button_text_request")}
            </div>
          </button>
        </div>
        {modalPrompt}
      </div>
    );
  }
}

LookupMobileProofing.propTypes = {
  disabled: PropTypes.bool,
  handleLookupMobile: PropTypes.func
};

export default LookupMobileProofing;

import React, { Component } from "react";
import PropTypes from "prop-types";

import EduIDButton from "components/EduIDButton";
import NotificationsContainer from "containers/Notifications";

import FormText from "reactstrap/lib/FormText";
import Button from "reactstrap/lib/Button";
import ButtonGroup from "reactstrap/lib/ButtonGroup";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";

class Eidas extends Component {
  render() {
    // Temporary instructions until Sweden Connect has more alternatives and we have a DS
    const freja_instructions = (
      <div id="freja-instructions">
        <ol>
          <li>{this.props.l10n("eidas.freja_instructions_step1")}</li>
          <li>{this.props.l10n("eidas.freja_instructions_step2")}</li>
          <li>{this.props.l10n("eidas.freja_instructions_step3")}</li>
          <li>{this.props.l10n("eidas.freja_instructions_step4")}</li>
          <label>{this.props.l10n("eidas.freja_instructions_tip1")}</label>
          <li>{this.props.l10n("eidas.freja_instructions_step5")}</li>
        </ol>
      </div>
    );

    let have_freja, install_freja;

    have_freja = (
      <EduIDButton
        className="btn-link"
        href={this.props.eidas_sp_freja_idp_url}
      >
        {this.props.l10n("eidas.freja_eid_ready")}
      </EduIDButton>
    );

    install_freja = (
      <EduIDButton
        className="btn-link"
        href="https://frejaeid.com/skaffa-freja-eid/"
        target="_blank"
      >
        {this.props.l10n("eidas.freja_instructions_install_link")}
      </EduIDButton>
    );

    return (
      <div>
        <div className="vetting-button">
          <button
            id="eidas-show-modal"
            // disabled={this.props.disabled}
            onClick={this.props.handleShowModal}
          >
            <div className="vetting-button-text">
              {this.props.l10n("verify-identity.vetting_freja_tagline")}
            </div>
            <div className="vetting-button-name">
              {this.props.l10n("eidas.vetting_button_freja")}
            </div>
          </button>
        </div>
        <div
          id="eidas-info-dialog"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="askDialogPrompt"
          aria-hidden="true"
          data-backdrop="true"
        >
          <Modal isOpen={this.props.showModal} id="eidas-modal">
            <ModalHeader>{this.props.l10n("eidas.modal_title")}</ModalHeader>

            <ModalBody>
              {/* <h4>{this.props.l10n("eidas.freja_instructions_title")}</h4> */}
              {freja_instructions}
              <div id="freja-links">
                {have_freja}
                {install_freja}
              </div>
            </ModalBody>

            <ModalFooter>
              <EduIDButton
                className="modal-button cancel-button"
                id="eidas-hide-modal"
                onClick={this.props.handleHideModal}
              >
                {this.props.l10n("cm.close")}
              </EduIDButton>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

Eidas.propTypes = {
  handleShowModal: PropTypes.func,
  handleHideModal: PropTypes.func,
  showModal: PropTypes.bool,
  eidas_sp_freja_idp_url: PropTypes.string
};

export default Eidas;

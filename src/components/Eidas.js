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
import NotificationModal from "../login/components/Modals/NotificationModal";

class Eidas extends Component {
  render() {
    // Temporary instructions until Sweden Connect has more alternatives and we have a DS
    const freja_instructions = (
      <div id="freja-instructions">
        <ol>
          <li>{this.props.translate("eidas.freja_instructions_step1")}</li>
          <li>{this.props.translate("eidas.freja_instructions_step2")}</li>
          <li>{this.props.translate("eidas.freja_instructions_step3")}</li>
          <li>{this.props.translate("eidas.freja_instructions_step4")}</li>
          <label>{this.props.translate("eidas.freja_instructions_tip1")}</label>
          <li>{this.props.translate("eidas.freja_instructions_step5")}</li>
        </ol>
        <a
          // className="btn-link"
          href="https://frejaeid.com/skaffa-freja-eid/"
          target="_blank"
        >
          {this.props.translate("eidas.freja_instructions_install_link")}
        </a>
      </div>
    );

    return (
      <div>
        <div className="vetting-button">
          <button id="eidas-show-modal" onClick={this.props.handleShowModal}>
            <div className="text">
              {this.props.translate("verify-identity.vetting_freja_tagline")}
            </div>
            <div className="name">
              {this.props.translate("eidas.vetting_button_freja")}
            </div>
          </button>
        </div>
        <NotificationModal 
          modalId="eidas-info-dialog"
          title={this.props.translate("eidas.modal_title")}
          href={this.props.eidas_sp_freja_idp_url}
          showModal={this.props.showModal}
          closeModal={this.props.handleHideModal}
          mainText={freja_instructions}
          closeText={this.props.translate("cm.close")}
          closeButtonId={"eidas-hide-modal"}
          acceptButtonText={this.props.translate("eidas.freja_eid_ready")}
        />
        {/* <div
          id="eidas-info-dialog"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="askDialogPrompt"
          aria-hidden="true"
          data-backdrop="true"
        >
          <Modal isOpen={this.props.showModal} id="eidas-modal">
            <ModalHeader>
              {this.props.translate("eidas.modal_title")}
            </ModalHeader>

            <ModalBody>{freja_instructions}</ModalBody>

            <ModalFooter>
              <EduIDButton
                className="modal-button ok-button"
                href={this.props.eidas_sp_freja_idp_url}
              >
                {this.props.translate("eidas.freja_eid_ready")}
              </EduIDButton>
              <EduIDButton
                className="modal-button cancel-button"
                id="eidas-hide-modal"
                onClick={this.props.handleHideModal}
              >
                {this.props.translate("cm.close")}
              </EduIDButton>
            </ModalFooter>
          </Modal>
        </div> */}
      </div>
    );
  }
}

Eidas.propTypes = {
  handleShowModal: PropTypes.func,
  handleHideModal: PropTypes.func,
  showModal: PropTypes.bool,
  eidas_sp_freja_idp_url: PropTypes.string,
};

export default Eidas;

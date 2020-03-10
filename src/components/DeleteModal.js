import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import i18n from "i18n-messages";
import EduIDButton from "components/EduIDButton";

class DeleteModal extends Component {
  render() {
    return (
      <div
        id="securityDeleteDialog"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="askDialogPrompt"
        aria-hidden="true"
        data-backdrop="true"
      >
        <Modal isOpen={this.props.showModal} id="delete-account-modal">
          <ModalHeader>{this.props.title}</ModalHeader>

          <ModalBody>
            <p id="delete-account">
              {this.props.translate("delete.modal_info")}
            </p>
            <EduIDButton
              className="settings-button delete-button"
              id="confirm-delete-account-button"
              ref={button => {
                this.deleteButton = button;
              }}
              onClick={this.props.handleConfirm}
            >
              {this.props.translate("delete.confirm_button")}
            </EduIDButton>
            <p>{this.props.translate("delete.modal_tip")}</p>
          </ModalBody>
          <ModalFooter>
            <EduIDButton
              className="modal-button cancel-button"
              onClick={this.props.closeModal}
            >
              {this.props.translate("cm.cancel")}
            </EduIDButton>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

DeleteModal.propTypes = {
  title: PropTypes.any,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  handleConfirm: PropTypes.func
};

export default i18n(DeleteModal);

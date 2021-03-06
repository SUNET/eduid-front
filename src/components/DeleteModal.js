import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import EduIDButton from "components/EduIDButton";
import ButtonModal from "../login/components/Buttons/ButtonModal";

// import "../style/EduIDButton.scss";

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
            <p className="modal-text">
              {this.props.translate("delete.modal_info")}
            </p>
            {/* <p className="modal-text">
              {this.props.translate("delete.modal_tip")}
            </p> */}
          </ModalBody>
          <ModalFooter>
            <EduIDButton
              className="settings-button delete-button"
              ref={(button) => {
                this.deleteButton = button;
              }}
              onClick={this.props.handleConfirm}
            >
              {this.props.translate("delete.confirm_button")}
            </EduIDButton>
            <ButtonModal
              // id="close-modal"
              className="modal-button close-button"
              onClick={this.props.closeModal}
            >
              {this.props.translate("cm.cancel")}
            </ButtonModal>
            {/* <EduIDButton
              className="modal-button cancel-button"
              onClick={this.props.closeModal}
            >
              {this.props.translate("cm.cancel")}
            </EduIDButton> */}
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
  handleConfirm: PropTypes.func,
};

export default i18n(DeleteModal);

import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "reactstrap/lib/Button";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";

import i18n from "i18n-messages";
import EduIDButton from "components/EduIDButton";
import NotificationsContainer from "containers/Notifications";

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
        <Modal isOpen={this.props.showModal}>
          <ModalHeader>{this.props.title}</ModalHeader>

          <ModalBody>
            {/* <NotificationsContainer /> */}
            <div id="delete-account">
              <p>{this.props.l10n("security.modal_info")}</p>
              <p>{this.props.l10n("security.modal_notes")}</p>
              <EduIDButton
                className="btn-danger btn-default"
                id="confirm-delete-account-button"
                ref={button => {
                  this.deleteButton = button;
                }}
                onClick={this.props.handleConfirm}
              >
                {this.props.l10n("security.confirm_button")}
              </EduIDButton>
            </div>
          </ModalBody>
          <ModalFooter>
            <EduIDButton
              className="cancel-button"
              onClick={this.props.closeModal}
            >
              {this.props.l10n("cm.cancel")}
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

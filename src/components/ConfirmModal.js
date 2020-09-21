import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import ConfirmModalForm from "./ConfirmModalForm";
import EduIDButton from "components/EduIDButton";

const RenderCloseButton = ({closeModal}) => {
  return (
    <>
      <EduIDButton
        className="modal-button cancel-button"
        onClick={closeModal}
      >
      <svg
        className="remove"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7 0h2v16H7z" />
        <path d="M0 9V7h16v2z" />
      </svg>
      </EduIDButton>
    </>
  )
}
class ConfirmModal extends Component {
  render() {
    let resendMarkup = "";
    if (this.props.with_resend_link) {
      resendMarkup = (
        <div className="resend-code-container">
          <a href="#" onClick={this.props.handleResend} className="resend-code">
            {this.props.resendText}
          </a>
        </div>
      );
    }

    return (
      <div
        id={this.props.modalId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="askDialogPrompt"
        aria-hidden="true"
        data-backdrop="true"
      >
        <Modal
          id="confirm-user-data-modal"
          isOpen={this.props.showModal}
        >
          <ModalHeader>{this.props.title}
          <RenderCloseButton  closeModal={this.props.closeModal}/>
          </ModalHeader>
          <ModalBody>
            <ConfirmModalForm 
              helpBlock={this.props.helpBlock} 
              inputName={this.props.id} 
              {...this.props} 
            />
            {resendMarkup}
          </ModalBody>
          <ModalFooter>
            <EduIDButton
              className="modal-button ok-button"
              disabled={!this.props.formEnabled}
              onClick={this.props.handleConfirm}
            >
              {this.props.translate("cm.ok")}
            </EduIDButton>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ConfirmModal.propTypes = {
  placeholder: PropTypes.string,
  handleConfirm: PropTypes.func,
  confirming: PropTypes.string,
  handleResend: PropTypes.func,
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
  with_resend_link: PropTypes.bool
};

ConfirmModal.defaultProps = {
  with_resend_link: true
};

export default ConfirmModal;
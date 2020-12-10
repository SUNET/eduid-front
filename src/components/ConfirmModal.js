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
    <div className="close-button-container">
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
    </div>
  )
}
class ConfirmModal extends Component {
  render() {
    const { 
      with_resend_link, 
      handleResend, 
      resendText, 
      modalId, 
      closeModal, 
      helpBlock, 
      showModal,
      id, 
      formEnabled, 
      handleConfirm, 
      translate,
      title
    } = this.props;

    let resendMarkup = "";
    if (with_resend_link) {
      resendMarkup = (
        <div className="resend-code-container">
          <a href="#" onClick={handleResend} className="resend-code">
            {resendText}
          </a>
        </div>
      );
    }

    return (
      <div
        id={modalId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="askDialogPrompt"
        aria-hidden="true"
        data-backdrop="true"
      >
        <Modal
          id="confirm-user-data-modal"
          isOpen={showModal}
        >
          <ModalHeader>
            <RenderCloseButton  
              closeModal={closeModal}
            />
            {title}
          </ModalHeader>
          <ModalBody>
            <ConfirmModalForm 
              helpBlock={helpBlock} 
              inputName={id} 
              {...this.props} 
            />
            {resendMarkup}
          </ModalBody>
          <ModalFooter>
            <EduIDButton
              className="modal-button ok-button"
              disabled={!formEnabled}
              onClick={handleConfirm}
            >
              {translate("cm.ok")}
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
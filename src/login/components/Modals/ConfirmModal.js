import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ConfirmModalForm from "../../../components/ConfirmModalForm";
import EduIDButton from "../../../components/EduIDButton";

const RenderCloseButton = ({ closeModal }) => {
  return <EduIDButton color="close" onClick={closeModal}></EduIDButton>;
};
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
      title,
    } = this.props;

    let resendMarkup = "";
    if (with_resend_link) {
      resendMarkup = (
        <div className="resend-code-container">
          <a href="#" onClick={handleResend}>
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
        <Modal id="confirm-user-data-modal" isOpen={showModal}>
          <ModalHeader>
            {title}
            <RenderCloseButton closeModal={closeModal} />
          </ModalHeader>
          <ModalBody>
            <ConfirmModalForm helpBlock={helpBlock} inputName={id} {...this.props} />
            {resendMarkup}
          </ModalBody>
          <ModalFooter>
            <EduIDButton color="primary" disabled={!formEnabled} onClick={handleConfirm}>
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
  with_resend_link: PropTypes.bool,
};

ConfirmModal.defaultProps = {
  with_resend_link: true,
};

export default ConfirmModal;

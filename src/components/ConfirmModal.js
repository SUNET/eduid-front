import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import ConfirmModalForm from "./ConfirmModalForm";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import EduIDButton from "components/EduIDButton";

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
          <ModalHeader>{this.props.title}</ModalHeader>
          <ModalBody>
            <ConfirmModalForm inputName={this.props.id} {...this.props} />
            {resendMarkup}
          </ModalBody>
          <ModalFooter>
            <EduIDButton
              className="modal-button ok-button"
              disabled={this.props.invalid}
              onClick={this.props.handleConfirm}
            >
              {this.props.translate("cm.ok")}
            </EduIDButton>
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

export default i18n(ConfirmModal);

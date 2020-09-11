import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import i18n from "../../../login/translation/InjectIntl_HOC_factory";
import EduIDButton from "../../../components/EduIDButton";

class NotificationModal extends Component {
  render() {
    const { 
      modalId, 
      showModal, 
      title, 
      mainText, 
      acceptButtonId, 
      acceptModal, 
      closeModal,
      acceptButtonText, 
      closeButtonId, 
      closeButtonText, 
      translate 
    } = this.props;

    return (
      <div
        id={modalId}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        data-backdrop="true"
      >
        <Modal isOpen={showModal} className={modalId}>
          <ModalHeader>{title}</ModalHeader>
          {
            modalId === "register-modal" ?
            <ModalBody 
              dangerouslySetInnerHTML={{ __html: mainText }} 
            />
            : 
            <ModalBody>
              <div>
                <p>{mainText}</p>
              </div>
            </ModalBody>
          }
          <ModalFooter>
            <EduIDButton
              id={acceptButtonId}
              className="modal-button ok-button"
              onClick={acceptModal}
            >
              {
                acceptButtonText ? acceptButtonText 
                : translate("cm.accept")
              }
            </EduIDButton>
            <EduIDButton
              id={closeButtonId}
              className="modal-button cancel-button"
              onClick={closeModal}
            >
              {
                closeButtonText ? closeButtonText 
                : translate("cm.cancel")
              }
            </EduIDButton>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

NotificationModal.propTypes = {
  modalId: PropTypes.string,
  title: PropTypes.any,
  mainText: PropTypes.any,
  closeModal: PropTypes.func,
  acceptModal: PropTypes.func,
  showModal: PropTypes.bool,
  confirming: PropTypes.bool
};

export default i18n(NotificationModal);
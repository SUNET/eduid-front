import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import i18n from "../../../login/translation/InjectIntl_HOC_factory";
import EduIDButton from "../../../components/EduIDButton";

const RenderCloseButton = ({ 
  closeButtonId, 
  closeModal, 
  closeButtonText, 
  translate 
}) => {
  return(
    <EduIDButton
      id={closeButtonId}
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
  )
}

const RenderAcceptButton = ({ 
  href, 
  acceptButtonId, 
  acceptModal, 
  acceptButtonText, 
  translate 
})=>{
  return(
    href ?
    <>
      <EduIDButton
        id={acceptButtonId}
        className="modal-button ok-button"
        href={href}
      >
      {
        acceptButtonText ? acceptButtonText 
        : translate("cm.accept")
      }
      </EduIDButton>
    </>
    :
    <>
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
    </>
  )
}

const RenderModalBody = ({ modalId, mainText }) => {
  return (
    modalId === "register-modal" ?
    <ModalBody 
      dangerouslySetInnerHTML={{ __html: mainText }} 
    />
    : 
    <ModalBody>
      <>
        {mainText}
      </>
    </ModalBody>
  )
}

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
      translate,
      href
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
          <ModalHeader>{title}
          <RenderCloseButton 
            closeButtonId={closeButtonId}
            closeModal={closeModal}
            translate={translate} 
            closeButtonText={closeButtonText} 
            />
          </ModalHeader>
          <RenderModalBody 
            modalId={modalId} 
            mainText={mainText}
          />
          <ModalFooter>
            <RenderAcceptButton 
              acceptButtonId={acceptButtonId}
              acceptModal={acceptModal} 
              acceptButtonText={acceptButtonText} 
              translate={translate}
              href={href}
            />
         
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
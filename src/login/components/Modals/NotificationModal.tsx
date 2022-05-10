import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import i18n from "../../translation/InjectIntl_HOC_factory";
import EduIDButton from "../../../components/EduIDButton";

const RenderCloseButton = ({ closeButtonId, closeModal }) => {
  return (
    <EduIDButton id={closeButtonId} buttonstyle="close" className="float-right" onClick={closeModal}></EduIDButton>
  );
};

const RenderAcceptButton = ({ href, acceptButtonId, acceptModal, acceptButtonText, translate }) => {
  return href ? (
    <>
      <EduIDButton id={acceptButtonId} buttonstyle="primary" href={href}>
        {acceptButtonText ? acceptButtonText : translate("cm.accept")}
      </EduIDButton>
    </>
  ) : (
    <>
      <EduIDButton id={acceptButtonId} buttonstyle="primary" onClick={acceptModal}>
        {acceptButtonText ? acceptButtonText : translate("cm.accept")}
      </EduIDButton>
    </>
  );
};

const RenderModalBody = ({ modalId, mainText }) => {
  return modalId === "register-modal" ? (
    <ModalBody dangerouslySetInnerHTML={{ __html: mainText }} />
  ) : (
    <ModalBody>
      <>{mainText}</>
    </ModalBody>
  );
};

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
      href,
    } = this.props;

    return (
      <div id={modalId} tabIndex="-1" role="dialog" aria-hidden="true" data-backdrop="true">
        <Modal isOpen={showModal} className={modalId}>
          <ModalHeader>
            {title}
            <RenderCloseButton
              closeButtonId={closeButtonId}
              closeModal={closeModal}
              translate={translate}
              closeButtonText={closeButtonText}
            />
          </ModalHeader>
          <RenderModalBody modalId={modalId} mainText={mainText} />
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
  confirming: PropTypes.bool,
};

export default i18n(NotificationModal);

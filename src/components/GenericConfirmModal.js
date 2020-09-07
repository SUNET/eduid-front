import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";

import i18n from "../login/translation/InjectIntl_HOC_factory";
import EduIDButton from "components/EduIDButton";

class GenericConfirmModal extends Component {
  render() {
    return (
      <div
        id={this.props.modalId}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        data-backdrop="true"
      >
        <Modal isOpen={this.props.showModal}>
          <ModalHeader>{this.props.title}</ModalHeader>
          {
            this.props.modalId === "register-modal" ?
            <ModalBody 
              dangerouslySetInnerHTML={{ __html: this.props.mainText }} 
            />
            : 
            <ModalBody>
              <div>
                <p>{this.props.mainText}</p>
              </div>
            </ModalBody>
          }
          <ModalFooter>
            <EduIDButton
              className="modal-button ok-button"
              onClick={this.props.acceptModal}
            >
              {
                this.props.acceptButtonText ? this.props.acceptButtonText 
                : this.props.translate("cm.accept")
              }
            </EduIDButton>
            <EduIDButton
              className="modal-button cancel-button"
              onClick={this.props.closeModal}
            >
              {
                this.props.closeButtonText ? this.props.closeButtonText 
                : this.props.translate("cm.cancel")
              }
            </EduIDButton>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

GenericConfirmModal.propTypes = {
  modalId: PropTypes.string,
  title: PropTypes.any,
  mainText: PropTypes.any,
  closeModal: PropTypes.func,
  acceptModal: PropTypes.func,
  showModal: PropTypes.bool,
  //is_fetching: PropTypes.bool,
  confirming: PropTypes.bool
};

export default i18n(GenericConfirmModal);

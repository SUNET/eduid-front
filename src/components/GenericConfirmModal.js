import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import i18n from "i18n-messages";
import EduIDButton from "components/EduIDButton";
import NotificationsContainer from "containers/Notifications";

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

          <ModalBody>
            {/* <NotificationsContainer /> */}
            <div>
              <p>{this.props.mainText}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <EduIDButton
              className="cancel-button"
              onClick={this.props.closeModal.bind(this)}
            >
              {this.props.l10n("cm.cancel")}
            </EduIDButton>
            <EduIDButton
              className="ok-button"
              onClick={this.props.acceptModal.bind(this)}
            >
              {this.props.l10n("cm.accept")}
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
  is_fetching: PropTypes.bool,
  confirming: PropTypes.bool
};

export default i18n(GenericConfirmModal);

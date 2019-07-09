import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import Button from "reactstrap/lib/Button";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import ConfirmModalForm from "./ConfirmModalForm";

import i18n from "i18n-messages";
import TextInput from "components/EduIDTextInput";
import EduIDButton from "components/EduIDButton";
import NotificationsContainer from "containers/Notifications";


class ConfirmModal extends Component {
  render() {
    console.log("this is this-props.id:", this.props.id);
    // let ConfirmForm = getConfirmForm(this.props.id);


    let resendMarkup = "";
    // let inputName = "";
    if (this.props.with_resend_link) {
      resendMarkup = (
        <div>
          {this.props.resendHelp}
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
          isOpen={this.props.showModal}
          handleConfirm={this.props.handleConfirm}
        >
          <ModalHeader>{this.props.title}</ModalHeader>
          <ModalBody>
            {/* <NotificationsContainer />  */}
            <ConfirmModalForm inputName={this.props.id} {...this.props} />
            {resendMarkup}
          </ModalBody>
          <ModalFooter>
            <EduIDButton
              className="ok-button"
              disabled={this.props.invalid}
              onClick={this.props.handleConfirm}
            >
              {this.props.l10n("cm.ok")}
            </EduIDButton>
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

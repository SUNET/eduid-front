import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ConfirmModalForm from "../../../components/ConfirmModalForm";
import EduIDButton from "../../../components/EduIDButton";
import { isValid, isSubmitting } from "redux-form";
import { useAppSelector } from "../../app_init/hooks";
import { FormattedMessage } from "react-intl";

interface ConfirmModalProps {
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  handleConfirm: React.MouseEventHandler<HTMLButtonElement>;
  handleResend?: React.MouseEventHandler<HTMLAnchorElement>;
  id: string;
  modalId: string;
  placeholder: string;
  showModal: boolean;
  validationError: string;
  validationPattern?: RegExp;
  with_resend_link?: string;
  resendHelp?: any;
  resendLabel: any;
  resendText?: any;
  title: any;
  helpBlock?: any;
}

function ConfirmModal(props: ConfirmModalProps): JSX.Element {
  const state = useAppSelector((state) => state);
  const formEnabled = isValid("modal-form")(state) && !isSubmitting("modal-form")(state);

  let resendMarkup;
  if (!props.with_resend_link) {
    resendMarkup = undefined;
  }

  resendMarkup = (
    <div className="resend-code-container">
      <a href="#" onClick={props.handleResend}>
        {props.resendText}
      </a>
    </div>
  );

  return (
    <div
      id={props.modalId}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="askDialogPrompt"
      aria-hidden="true"
      data-backdrop="true"
    >
      <Modal id="confirm-user-data-modal" isOpen={props.showModal}>
        <ModalHeader>
          {props.title}
          <EduIDButton buttonstyle="close" onClick={props.closeModal}></EduIDButton>
        </ModalHeader>
        <ModalBody>
          <ConfirmModalForm helpBlock={props.helpBlock} inputName={props.id} {...props} />
          {resendMarkup}
        </ModalBody>
        <ModalFooter>
          <EduIDButton buttonstyle="primary" disabled={!formEnabled} onClick={props.handleConfirm}>
            <FormattedMessage defaultMessage="ok" description="ok button" />
          </EduIDButton>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ConfirmModal;

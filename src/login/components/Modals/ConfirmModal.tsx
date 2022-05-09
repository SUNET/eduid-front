import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EduIDButton from "../../../components/EduIDButton";
import { FormattedMessage } from "react-intl";
import CustomInput from "../Inputs/CustomInput";
import { Form as FinalForm, Field as FinalField } from "react-final-form";

interface ConfirmModalProps {
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  handleConfirm: React.MouseEventHandler<HTMLButtonElement>;
  handleResend?: React.MouseEventHandler<HTMLAnchorElement>;
  id: string;
  modalId: string;
  placeholder: string;
  showModal: boolean;
  validationError: string;
  validationPattern: RegExp;
  with_resend_link?: string;
  resendHelp?: any;
  resendLabel: any;
  resendText?: any;
  title: any;
  helpBlock?: any;
}

function ConfirmModal(props: ConfirmModalProps): JSX.Element {
  function validate(value: string) {
    if (!value || !value.trim()) {
      return "required";
    }
    if (!props.validationPattern.test(value.trim())) {
      return props.validationError;
    }
  }

  let resendMarkup: any;
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
        <FinalForm
          onSubmit={props.handleConfirm}
          initialValues={{
            [props.modalId]: "",
          }}
          {...props}
          render={(props: any) => (
            <React.Fragment>
              <ModalBody>
                <form id={props.modalId + "-form"} role="form">
                  <div id="confirmation-code-area">
                    <FinalField<string>
                      component={CustomInput}
                      componentClass="input"
                      type="text"
                      label={props.resendLabel}
                      placeholder={props.placeholder}
                      id={props.modalId}
                      name={props.modalId}
                      helpBlock={props.helpBlock}
                      validate={validate}
                    />
                  </div>
                </form>
                {resendMarkup}
              </ModalBody>
              <ModalFooter>
                <EduIDButton
                  buttonstyle="primary"
                  disabled={props.submitting || props.invalid}
                  onClick={props.handleConfirm}
                >
                  <FormattedMessage defaultMessage="ok" description="ok button" />
                </EduIDButton>
              </ModalFooter>
            </React.Fragment>
          )}
        />
      </Modal>
    </div>
  );
}

export default ConfirmModal;

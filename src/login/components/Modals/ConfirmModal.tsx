import React, { ReactChild } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EduIDButton from "../../../components/EduIDButton";
import { FormattedMessage } from "react-intl";
import CustomInput from "../Inputs/CustomInput";
import { Form as FinalForm, Field as FinalField } from "react-final-form";

interface ConfirmModalProps {
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  handleConfirm: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
  placeholder: string;
  showModal: boolean;
  validationError: string;
  validationPattern: RegExp;
  modalFormLabel: ReactChild;
  title: ReactChild;
  helpBlock?: ReactChild;
  resendMarkup?: ReactChild;
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

  return (
    <div
      id={props.id}
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
            [props.id]: "",
          }}
          {...props}
          render={({ submitting, invalid }) => (
            <React.Fragment>
              <ModalBody>
                <form id={props.id + "-form"} role="form">
                  <div id="confirmation-code-area">
                    <FinalField<string>
                      component={CustomInput}
                      componentClass="input"
                      type="text"
                      label={props.modalFormLabel}
                      placeholder={props.placeholder}
                      id={props.id}
                      name={props.id}
                      helpBlock={props.helpBlock}
                      validate={validate}
                    />
                  </div>
                </form>
                {!props.resendMarkup ? null : props.resendMarkup}
              </ModalBody>
              <ModalFooter>
                <EduIDButton buttonstyle="primary" disabled={submitting || invalid} onClick={props.handleConfirm}>
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

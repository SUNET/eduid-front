import { GetCaptchaResponse } from "apis/eduidSignup";
import React from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CustomInput from "./CustomInput";
import EduIDButton from "./EduIDButton";

interface ConfirmModalProps {
  id: string;
  title: React.ReactNode;
  placeholder: string;
  showModal: boolean;
  closeModal: () => void;
  handleConfirm: (values: { [key: string]: string }) => void;
  modalFormLabel: React.ReactNode;
  validationError?: string;
  validationPattern?: RegExp;
  helpBlock?: React.ReactNode;
  resendMarkup?: React.ReactNode;
  captcha?: GetCaptchaResponse;
  submitButtonText?: React.ReactNode;
}

function ConfirmModal(props: ConfirmModalProps): JSX.Element {
  function validate(value: string) {
    if (!value?.trim()) {
      return "required";
    }
    if (!props.validationPattern?.test(value.trim())) {
      return props.validationError;
    }
  }

  return (
    <FinalForm
      onSubmit={props.handleConfirm}
      initialValues={{
        [props.id]: "",
      }}
      {...props}
      render={({ submitting, invalid, handleSubmit, form }) => (
        <dialog tabIndex={-1} aria-hidden="true" data-backdrop="true">
          <Modal id="confirm-user-data-modal" isOpen={props.showModal} autoFocus={false}>
            <ModalHeader>
              {props.title}
              <EduIDButton
                buttonstyle="close"
                onClick={() => {
                  props.closeModal();
                  form.reset();
                }}
              ></EduIDButton>
            </ModalHeader>
            <form
              id={props.id + "-form"}
              role="form"
              onSubmit={async (event) => {
                await handleSubmit(event);
                form.reset();
              }}
            >
              <ModalBody>
                {props.captcha && (
                  <React.Fragment>
                    <img src={props.captcha.captcha_img} alt="captcha" />
                    <audio controls className="captcha-audio" src={props.captcha.captcha_audio} />
                  </React.Fragment>
                )}
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
                    autoFocus={true}
                  />
                </div>
                {props.resendMarkup ? props.resendMarkup : null}
              </ModalBody>
              <ModalFooter>
                <EduIDButton
                  type="submit"
                  buttonstyle="primary"
                  disabled={submitting || invalid}
                  onClick={() => props.handleConfirm}
                >
                  {props.submitButtonText ? (
                    props.submitButtonText
                  ) : (
                    <FormattedMessage defaultMessage="ok" description="ok button" />
                  )}
                </EduIDButton>
              </ModalFooter>
            </form>
          </Modal>
        </dialog>
      )}
    />
  );
}

export default ConfirmModal;

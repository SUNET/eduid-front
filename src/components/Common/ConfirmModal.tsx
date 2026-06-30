import { GetCaptchaResponse } from "apis/eduidSignup";
import React from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { CustomInput } from "./CustomInput";
import { EduIDButton } from "./EduIDButton";

interface ConfirmModalProps {
  id: string;
  title: React.ReactNode;
  mainText?: React.ReactNode;
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

export function ConfirmModal({
  validationPattern,
  validationError,
  handleConfirm,
  id,
  showModal,
  title,
  closeModal,
  mainText,
  placeholder,
  modalFormLabel,
  helpBlock,
  resendMarkup,
  captcha,
  submitButtonText,
}: Readonly<ConfirmModalProps>) {
  function validate(value: string) {
    if (!value?.trim()) {
      return "required";
    }
    if (!validationPattern?.test(value.trim())) {
      return validationError;
    }
  }

  return (
    <FinalForm
      onSubmit={handleConfirm}
      initialValues={{
        [id]: "",
      }}
      render={({ submitting, invalid, handleSubmit, form }) => (
        <dialog open={showModal}>
          <div className={showModal ? "modal fade show" : "modal"} tabIndex={-1}>
            <div className={`modal-dialog horizontal-content-margin ${id}`}>
              <div className={`modal-content ${id} `}>
                <div className="modal-header">
                  <h4 className="modal-title">{title}</h4>
                  <EduIDButton
                    buttonstyle="close"
                    onClick={() => {
                      closeModal();
                      form.reset();
                    }}
                  ></EduIDButton>
                </div>
                <form
                  id={id + "-form"}
                  onSubmit={async (event) => {
                    await handleSubmit(event);
                    form.reset();
                  }}
                >
                  <div className="modal-body">
                    {captcha && (
                      <React.Fragment>
                        <img src={captcha.captcha_img} alt="captcha" />
                        <audio
                          controls
                          aria-label="Audio for captcha"
                          className="captcha-audio"
                          src={captcha.captcha_audio}
                        />
                      </React.Fragment>
                    )}

                    {mainText}
                    <FinalField<string>
                      component={CustomInput}
                      componentClass="input"
                      type="text"
                      label={modalFormLabel}
                      placeholder={placeholder}
                      id={id}
                      name={id}
                      helpBlock={helpBlock}
                      validate={validate}
                      autoFocus={true}
                    />
                    {resendMarkup}
                  </div>
                  <div className="modal-footer">
                    <EduIDButton type="submit" buttonstyle="primary" disabled={submitting || invalid}>
                      {submitButtonText ?? <FormattedMessage defaultMessage="ok" description="ok button" />}
                    </EduIDButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      )}
    />
  );
}

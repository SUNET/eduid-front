import { GetCaptchaResponse } from "apis/eduidSignup";
import React from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import CustomInput from "./CustomInput";
import EduIDButton from "./EduIDButton";

interface ConfirmModalProps {
  readonly id: string;
  readonly title: React.ReactNode;
  readonly mainText?: React.ReactNode;
  readonly placeholder: string;
  readonly showModal: boolean;
  readonly closeModal: () => void;
  readonly handleConfirm: (values: { [key: string]: string }) => void;
  readonly modalFormLabel: React.ReactNode;
  readonly validationError?: string;
  readonly validationPattern?: RegExp;
  readonly helpBlock?: React.ReactNode;
  readonly resendMarkup?: React.ReactNode;
  readonly captcha?: GetCaptchaResponse;
  readonly submitButtonText?: React.ReactNode;
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
        <dialog open={props.showModal}>
          <div className={props.showModal ? "modal fade show" : "modal"} tabIndex={-1}>
            <div className={`modal-dialog ${props.id}`}>
              <div className={`modal-content ${props.id} `}>
                <div className="modal-header">
                  <h4 className="modal-title">{props.title}</h4>
                  <EduIDButton
                    buttonstyle="close"
                    onClick={() => {
                      props.closeModal();
                      form.reset();
                    }}
                  ></EduIDButton>
                </div>
                <form
                  id={props.id + "-form"}
                  onSubmit={async (event) => {
                    await handleSubmit(event);
                    form.reset();
                  }}
                >
                  <div className="modal-body">
                    {props.captcha && (
                      <React.Fragment>
                        <img src={props.captcha.captcha_img} alt="captcha" />
                        <audio
                          controls
                          aria-label="Audio for captcha"
                          className="captcha-audio"
                          src={props.captcha.captcha_audio}
                        />
                      </React.Fragment>
                    )}

                    {props.mainText ? props.mainText : null}
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
                    {props.resendMarkup ? props.resendMarkup : null}
                  </div>
                  <div className="modal-footer">
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

export default ConfirmModal;

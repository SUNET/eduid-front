import React from "react";
import EmailInput from "login/components/Inputs/EmailInput";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import EduIDButton from "../../../../components/EduIDButton";
import { useAppSelector } from "../../../app_init/hooks";
import { GoBackButton } from "./GoBackButton";

export interface EmailFormProps {
  passEmailUp: (email: string) => void;
}
export interface EmailFormData {
  email?: string;
}

// **************************************************************************************
// * TODO: Can this be shared with a new username-only login form, and the Signup form? *
// **************************************************************************************
function EmailForm(props: EmailFormProps): JSX.Element {
  const request_in_progress = useAppSelector((state) => state.app.request_in_progress);

  const submitEmailForm = (values: EmailFormData) => {
    const errors: EmailFormData = {};

    if (values.email) {
      props.passEmailUp(values.email);
    } else {
      errors.email = "required";
    }

    return errors;
  };

  return (
    <FinalForm<EmailFormData>
      onSubmit={submitEmailForm}
      render={(formProps) => {
        const _submitError = Boolean(formProps.submitError && !formProps.dirtySinceLastSubmit);
        const _disabled = Boolean(
          formProps.hasValidationErrors || _submitError || formProps.pristine || request_in_progress
        );

        return (
          <form id="reset-password-form" onSubmit={formProps.handleSubmit}>
            <fieldset>
              <EmailInput name="email" autoFocus={true} required={true} autoComplete="username" />

              <div className="buttons">
                <EduIDButton
                  buttonstyle="primary"
                  id="reset-password-button"
                  disabled={_disabled}
                  onClick={formProps.handleSubmit}
                >
                  <FormattedMessage defaultMessage="send email" description="Reset Password button" />
                </EduIDButton>
                <GoBackButton />
              </div>
            </fieldset>
          </form>
        );
      }}
    />
  );
}

export default EmailForm;

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

// *****************************************************************
// * TODO: Can this be shared with a new username-only login form? *
// *****************************************************************
function EmailForm(props: EmailFormProps): JSX.Element {
  const request_in_progress = useAppSelector((state) => state.app.request_in_progress);

  const submitEmailForm = (values: EmailFormData) => {
    const email = values.email;
    if (email) {
      props.passEmailUp(email);
    }
  };

  return (
    <FinalForm<EmailFormData>
      id="reset-password-form"
      role="form"
      onSubmit={submitEmailForm}
      render={(formProps) => {
        return (
          <fieldset>
            <EmailInput name="email" autoFocus={true} required={true} autoComplete="username" />

            <div className="button-pair">
              <EduIDButton
                buttonstyle="primary"
                id="reset-password-button"
                disabled={formProps.invalid || request_in_progress}
                onClick={formProps.handleSubmit}
              >
                <FormattedMessage defaultMessage="send link to email" description="Reset Password button" />
              </EduIDButton>
              <GoBackButton />
            </div>
          </fieldset>
        );
      }}
    />
  );
}

export default EmailForm;

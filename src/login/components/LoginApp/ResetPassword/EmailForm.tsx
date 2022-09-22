import EmailInput from "login/components/Inputs/EmailInput";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import EduIDButton from "../../../../components/EduIDButton";
import { GoBackButton } from "./GoBackButton";

export interface EmailFormProps {
  passEmailUp: (email: string) => void;
  disabled?: boolean; // disable the submit button if true
}
export interface EmailFormData {
  email?: string;
}

// **************************************************************************************
// * TODO: Can this be shared with a new username-only login form, and the Signup form? *
// **************************************************************************************
function EmailForm(props: EmailFormProps): JSX.Element {
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
          formProps.hasValidationErrors || _submitError || formProps.pristine || props.disabled
        );

        return (
          <form id="reset-password-form" onSubmit={formProps.handleSubmit}>
            <fieldset>
              <EmailInput name="email" autoFocus={true} required={true} autoComplete="username" />

              <div className="buttons">
                <GoBackButton />
                <EduIDButton
                  buttonstyle="primary"
                  id="reset-password-button"
                  disabled={_disabled}
                  onClick={formProps.handleSubmit}
                >
                  <FormattedMessage defaultMessage="send email" description="Reset Password button" />
                </EduIDButton>
              </div>
            </fieldset>
          </form>
        );
      }}
    />
  );
}

export default EmailForm;

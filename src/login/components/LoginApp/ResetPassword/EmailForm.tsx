import EmailInput from "login/components/Inputs/EmailInput";
import { useContext } from "react";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import EduIDButton from "../../../../components/EduIDButton";
import { GoBackButton } from "./GoBackButton";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

export interface EmailFormProps {
  passEmailUp: (email: string) => void;
  disabled?: boolean; // disable the submit button if true
  defaultEmail?: string; // pre-fill the email field with this value
}
export interface EmailFormData {
  email?: string;
}

// **************************************************************************************
// * TODO: Can this be shared with a new username-only login form, and the Signup form? *
// **************************************************************************************
export function EmailForm(props: EmailFormProps): JSX.Element {
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

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
          formProps.hasValidationErrors ||
            _submitError ||
            formProps.pristine ||
            props.disabled ||
            !formProps.values["email"]
        );

        return (
          <form id="reset-password-form" onSubmit={formProps.handleSubmit}>
            <fieldset>
              <EmailInput
                name="email"
                autoFocus={true}
                required={true}
                autoComplete="username"
                defaultValue={props.defaultEmail}
              />

              <div className="buttons">
                <GoBackButton
                  onClickHandler={() => resetPasswordContext.resetPasswordService.send({ type: "ABORT" })}
                />
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

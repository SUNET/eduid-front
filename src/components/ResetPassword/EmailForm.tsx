import { EduIDButton } from "components/Common/EduIDButton";
import { EmailInput } from "components/Common/EmailInput";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import resetPasswordSlice from "slices/ResetPassword";

export interface EmailFormProps {
  passEmailUp: (email: string) => void;
  disabled?: boolean; // disable the submit button if true
  defaultEmail?: string; // pre-fill the email field with this value
}
export interface EmailFormData {
  email?: string;
}

export function EmailForm({ passEmailUp, disabled, defaultEmail }: Readonly<EmailFormProps>) {
  const dispatch = useAppDispatch();
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  const submitEmailForm = (values: EmailFormData) => {
    const errors: EmailFormData = {};

    if (values.email) {
      passEmailUp(values.email);
    } else {
      errors.email = "required";
    }

    return errors;
  };

  const handleCancel = () => {
    if (dashboard_link) {
      document.location.href = dashboard_link;
    }
    dispatch(resetPasswordSlice.actions.resetEmailStatus());
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
          disabled ||
          !formProps.values?.["email"],
        );

        return (
          <form id="reset-password-form" onSubmit={formProps.handleSubmit}>
            <EmailInput
              name="email"
              autoFocus={true}
              required={true}
              autoComplete="username"
              defaultValue={defaultEmail}
            />

            <div className="buttons">
              <EduIDButton id="cancel-button" buttonstyle="secondary" onClick={handleCancel}>
                <FormattedMessage defaultMessage="Cancel" description="button cancel" />
              </EduIDButton>
              <EduIDButton
                buttonstyle="primary"
                id="reset-password-button"
                disabled={_disabled}
                type="submit"
                onClick={formProps.handleSubmit}
              >
                <FormattedMessage defaultMessage="send email" description="Reset Password button" />
              </EduIDButton>
            </div>
          </form>
        );
      }}
    />
  );
}

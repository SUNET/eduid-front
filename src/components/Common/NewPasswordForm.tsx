import { ExtraSecurityAlternatives } from "apis/eduidResetPassword";
import CustomInput from "components/Common/CustomInput";
import EduIDButton from "components/Common/EduIDButton";
import { GoBackButton } from "components/ResetPassword/GoBackButton";
import { FormApi, SubmissionErrors } from "final-form";
import { emptyStringPattern } from "helperFunctions/validation/regexPatterns";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";

const newPasswordFormId = "new-password-form";

export interface NewPasswordFormData {
  newPassword?: string;
}

interface NewPasswordFormProps {
  goBack?: () => void;
  extra_security?: ExtraSecurityAlternatives;
  suggested_password: string | undefined;
  submitNewPasswordForm: (
    values: NewPasswordFormData,
    form: FormApi<NewPasswordFormData, Partial<NewPasswordFormData>>,
    callback?: ((errors?: SubmissionErrors) => void) | undefined
  ) => void | Promise<void>;
  submitButtonText: React.ReactChild;
}

export function NewPasswordForm(props: NewPasswordFormProps): JSX.Element {
  function validateNewPassword(values: NewPasswordFormData) {
    const newPassword = values.newPassword;
    const errors: NewPasswordFormData = {};

    if (!newPassword || emptyStringPattern.test(newPassword)) {
      errors.newPassword = "required";
    } else if (newPassword?.replace(/\s/g, "") !== props.suggested_password?.replace(/\s/g, "")) {
      // Remove whitespace from both passwords before comparing
      errors.newPassword = "chpass.different-repeat";
    }
    return errors;
  }

  return (
    <FinalForm<NewPasswordFormData>
      onSubmit={props.submitNewPasswordForm}
      validate={validateNewPassword}
      render={(formProps) => {
        return (
          <form id={newPasswordFormId} onSubmit={formProps.handleSubmit}>
            <FinalField
              id="new-password"
              type="text"
              name="newPassword"
              component={CustomInput}
              required={true}
              label={<FormattedMessage defaultMessage="Repeat new password" description="Set new password" />}
              placeholder="xxxx xxxx xxxx"
              autoFocus={true}
            />

            <div className="buttons">
              {props.extra_security && Object.keys(props.extra_security).length > 0 && (
                <GoBackButton onClickHandler={props.goBack} />
              )}
              <EduIDButton buttonstyle="primary" id="new-password-button" disabled={formProps.invalid}>
                {props.submitButtonText}
              </EduIDButton>
            </div>
          </form>
        );
      }}
    />
  );
}

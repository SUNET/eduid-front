import { ExtraSecurityAlternatives } from "apis/eduidResetPassword";
import CustomInput from "components/Common/CustomInput";
import EduIDButton from "components/Common/EduIDButton";
import { GoBackButton } from "components/ResetPassword/GoBackButton";
import { emptyStringPattern } from "helperFunctions/validation/regexPatterns";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";

const newPasswordFormId = "new-password-form";

export interface NewPasswordFormData {
  newPassword?: string;
  suggested?: string;
}

interface NewPasswordFormProps {
  readonly goBack?: () => void;
  readonly extra_security?: ExtraSecurityAlternatives;
  readonly suggested_password: string | undefined;
  readonly submitNewPasswordForm: any;
  // submitNewPasswordForm: (
  //   values: NewPasswordFormData,
  //   form: FormApi<NewPasswordFormData, Partial<NewPasswordFormData>>,
  //   callback?: ((errors?: SubmissionErrors) => void) | undefined
  // ) => void | Promise<void>;
  readonly submitButtonText: React.ReactChild;
  readonly handleCancel?: (event: React.MouseEvent<HTMLElement>) => void;
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
              autoFocus={true}
            />

            <div className="buttons">
              {props.extra_security && Object.keys(props.extra_security).length > 0 && (
                <GoBackButton onClickHandler={props.goBack} />
              )}
              {props.handleCancel && (
                <EduIDButton buttonstyle="secondary" onClick={props.handleCancel}>
                  <FormattedMessage defaultMessage="cancel" description="button cancel" />
                </EduIDButton>
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

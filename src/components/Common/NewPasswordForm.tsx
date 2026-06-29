import { ExtraSecurityAlternatives } from "apis/eduidResetPassword";
import { CustomInput } from "components/Common/CustomInput";
import { EduIDButton } from "components/Common/EduIDButton";
import { GoBackButton } from "components/ResetPassword/GoBackButton";
import { emptyStringPattern } from "helperFunctions/validation/regexPatterns";
import { FormEventHandler } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";

const newPasswordFormId = "new-password-form";

export interface NewPasswordFormData {
  newPassword?: string;
  suggested?: string;
  custom?: string;
}

interface NewPasswordFormProps {
  goBack?: () => void;
  extra_security?: ExtraSecurityAlternatives;
  suggested_password: string | undefined;
  submitNewPasswordForm: FormEventHandler<HTMLFormElement> | undefined;
  submitButtonText: React.ReactNode;
  handleCancel?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function NewPasswordForm({
  suggested_password,
  submitNewPasswordForm,
  extra_security,
  goBack,
  submitButtonText,
}: Readonly<NewPasswordFormProps>) {
  function validateNewPassword(values: NewPasswordFormData) {
    const newPassword = values.newPassword;
    const errors: NewPasswordFormData = {};

    if (!newPassword || emptyStringPattern.test(newPassword)) {
      errors.newPassword = "required";
    } else if (newPassword?.replaceAll(/\s/g, "") !== suggested_password?.replaceAll(/\s/g, "")) {
      // Remove whitespace from both passwords before comparing
      errors.newPassword = "chpass.different-repeat";
    }
    return errors;
  }

  return (
    <FinalForm<NewPasswordFormData>
      onSubmit={validateNewPassword}
      validate={validateNewPassword}
      render={(formProps) => {
        return (
          <form id={newPasswordFormId} onSubmit={submitNewPasswordForm}>
            <FinalField
              id="new-password"
              type="text"
              name="newPassword"
              component={CustomInput}
              required={true}
              label={<FormattedMessage defaultMessage="Repeat new password" description="Set new password" />}
              autoFocus={true}
              placeholder="xxxx xxxx xxxx"
            />

            <div className="buttons">
              {extra_security && Object.keys(extra_security).length > 0 && <GoBackButton onClickHandler={goBack} />}
              <EduIDButton type="submit" buttonstyle="primary" id="new-password-button" disabled={formProps.invalid}>
                {submitButtonText}
              </EduIDButton>
            </div>
          </form>
        );
      }}
    />
  );
}

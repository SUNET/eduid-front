import { CopyToClipboard } from "components/Common/CopyToClipboard";
import { NewPasswordForm } from "components/Common/NewPasswordForm";
import { useAppSelector } from "eduid-hooks";
import React, { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { ChangePasswordChildFormProps } from "./ChangePassword";

export default function ChangePasswordSuggestedForm(props: ChangePasswordChildFormProps) {
  const ref = useRef<HTMLInputElement>(null);
  const suggested_password = useAppSelector((state) => state.chpass.suggested_password);
  // Form field validator
  const required = (value: string) => (value ? undefined : "required");

  return (
    <React.Fragment>
      <div className="reset-password-input">
        <label htmlFor="copy-new-password">
          <FormattedMessage defaultMessage="New password" description="Set new password" />
        </label>
        <input
          name="copy-new-password"
          id="copy-new-password"
          ref={ref}
          defaultValue={suggested_password}
          readOnly={true}
        />
        <CopyToClipboard ref={ref} />
      </div>
      <NewPasswordForm
        suggested_password={suggested_password}
        submitNewPasswordForm={props.formProps.handleSubmit}
        submitButtonText={<FormattedMessage defaultMessage="Ok" description="Set new password (ok button)" />}
        handleCancel={props.handleCancel}
      />
    </React.Fragment>
  );
}

import { CopyToClipboard } from "components/Common/CopyToClipboard";
import { NewPasswordForm } from "components/Common/NewPasswordForm";
import React, { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { ChangePasswordChildFormProps } from "./ChangePassword";

export default function ChangePasswordSuggestedForm(props: ChangePasswordChildFormProps) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <React.Fragment>
      <div className="copy-password-input">
        <label htmlFor="copy-new-password">
          <FormattedMessage defaultMessage="New password" description="new password" />
        </label>

        <input
          name="copy-new-password"
          id="copy-new-password"
          ref={ref}
          defaultValue={props.suggestedPassword}
          readOnly={true}
        />
        <CopyToClipboard ref={ref} />
      </div>
      <NewPasswordForm
        suggested_password={props.suggestedPassword}
        submitNewPasswordForm={props.formProps.handleSubmit}
        submitButtonText={<FormattedMessage defaultMessage="Save" description="Set new password (Save button)" />}
        handleCancel={props.handleCancel}
      />
    </React.Fragment>
  );
}

import { CopyToClipboardButton } from "components/Common/CopyToClipboardButton";
import { NewPasswordForm } from "components/Common/NewPasswordForm";
import React, { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { ChangePasswordChildFormProps } from "./ChangePassword";

export default function ChangePasswordSuggestedForm(props: ChangePasswordChildFormProps) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <React.Fragment>
      <label htmlFor="copy-new-password">
        <FormattedMessage defaultMessage="New password" description="new password" />
      </label>
      <div className="password-input">
        <CopyToClipboardButton ref={ref} />
        <input
          name="copy-new-password"
          id="copy-new-password"
          ref={ref}
          defaultValue={props.suggestedPassword}
          readOnly={true}
        />
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

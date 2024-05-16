import { CopyToClipboard } from "components/Common/CopyToClipboard";
import { NewPasswordForm } from "components/Common/NewPasswordForm";
import { useAppSelector } from "eduid-hooks";
import { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { ChangePasswordChildFormProps } from "./ChangePasswordForm";

export default function ChangePasswordSuggestedForm(props: ChangePasswordChildFormProps) {
  const ref = useRef<HTMLInputElement>(null);
  const suggested_password = useAppSelector((state) => state.chpass.suggested_password);
  // Form field validator
  const required = (value: string) => (value ? undefined : "required");
  console.log("props", props);
  return (
    <>
      <div className="reset-password-input">
        <label htmlFor="copy-new-password">
          <FormattedMessage defaultMessage="New password" description="Set new password" />
        </label>
        <input
          name="copy-new-password"
          id="copy-new-password"
          ref={ref}
          defaultValue={suggested_password ? suggested_password : ""}
          readOnly={true}
        />
        <CopyToClipboard ref={ref} />
      </div>
      <NewPasswordForm
        suggested_password={suggested_password}
        submitNewPasswordForm={props.formProps.handleSubmit}
        submitButtonText={
          <FormattedMessage defaultMessage="accept password" description="Set new password (accept button)" />
        }
        handleCancel={props.handleCancel}
      />
    </>
    // <form id="passwordsview-form" role="form" onSubmit={props.formProps.handleSubmit}>
    //   <fieldset>
    //     <FinalField<string>
    //       name="suggested"
    //       component={TextInput}
    //       componentClass="input"
    //       type="text"
    //       id="suggested-password-field"
    //       className="suggested-password"
    //       label={<FormattedMessage defaultMessage="Suggested password" description="chpass suggested password" />}
    //       disabled={true}
    //       autoComplete="new-password"
    //     />
    //   </fieldset>
    // </form>
  );
}

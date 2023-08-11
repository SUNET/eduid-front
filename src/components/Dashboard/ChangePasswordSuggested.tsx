import TextInput from "components/Common/EduIDTextInput";
import { Field as FinalField } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { ChangePasswordChildFormProps } from "./ChangePasswordForm";

export default function ChangePasswordSuggestedForm(props: ChangePasswordChildFormProps) {
  // Form field validator
  const required = (value: string) => (value ? undefined : "required");

  return (
    <form id="passwordsview-form" role="form" onSubmit={props.formProps.handleSubmit}>
      <fieldset>
        <FinalField<string>
          name="old"
          component={TextInput}
          componentClass="input"
          type="password"
          id="old-password-field"
          label={<FormattedMessage defaultMessage="Current password" description="chpass old password label" />}
          validate={required}
          autoComplete="current-password"
        />
      </fieldset>
      <fieldset>
        <FinalField<string>
          name="suggested"
          component={TextInput}
          componentClass="input"
          type="text"
          id="suggested-password-field"
          className="suggested-password"
          label={<FormattedMessage defaultMessage="Suggested password" description="chpass suggested password" />}
          disabled={true}
          autoComplete="new-password"
        />
      </fieldset>
    </form>
  );
}

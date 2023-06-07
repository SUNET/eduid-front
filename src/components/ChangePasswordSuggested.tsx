import TextInput from "components/EduIDTextInput";
import { Field as FinalField } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { ChangePasswordChildFormProps } from "./ChangePasswordForm";

export default function ChangePasswordSuggestedForm(props: ChangePasswordChildFormProps) {
  return (
    <form id="passwordsview-form" role="form" onSubmit={props.formProps.handleSubmit}>
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

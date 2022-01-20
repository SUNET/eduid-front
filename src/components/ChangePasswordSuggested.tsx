import TextInput from "components/EduIDTextInput";
import { translate } from "login/translation";
import React from "react";
import { Field as FinalField } from "react-final-form";
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
          label={translate("chpass.old_password")}
          validate={required}
          autocomplete="current-password"
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
          label={translate("chpass.suggested_password")}
          disabled={true}
          autocomplete="new-password"
        />
      </fieldset>
    </form>
  );
}

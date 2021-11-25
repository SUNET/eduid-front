import React from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { connect } from "react-redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";

export const LOCAL_STORAGE_PERSISTED_EMAIL = "email";

export interface EmailFormData {
  email?: string;
}
export interface EmailFormProps {
  requestEmailLink: (event: React.FormEvent<HTMLFormElement>) => void;
  translate(msg: string): string;
  request_in_progress: boolean;
  invalid: boolean;
}

const EmailForm: React.FC<EmailFormProps & InjectedFormProps<EmailFormData, EmailFormProps>> = (
  props: EmailFormProps
): JSX.Element => {
  return (
    <Form id="reset-password-form" role="form" onSubmit={props.requestEmailLink}>
      <Field
        type="email"
        name="email"
        label={props.translate("profile.email_display_title")}
        componentClass="input"
        id="email-input"
        component={CustomInput}
        placeholder="name@example.com"
        required={true}
        helpBlock={props.translate("emails.input_help_text")}
      />
      <EduIDButton
        className="settings-button"
        id="reset-password-button"
        disabled={props.invalid || props.request_in_progress}
        onClick={props.requestEmailLink}
      >
        {props.translate("resetpw.send-link")}
      </EduIDButton>
    </Form>
  );
};

const DecoratedEmailForm = reduxForm<EmailFormData, EmailFormProps>({
  form: "reset-pass-email-form",
  validate,
})(EmailForm);

connect(() => ({ touchOnChange: true, enableReinitialize: true, destroyOnUnmount: false }))(DecoratedEmailForm);

export default InjectIntl(DecoratedEmailForm);

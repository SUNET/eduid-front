import React from "react";
import { translate } from "../../../../login/translation";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";
import { useAppDispatch } from "../../../app_init/hooks";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { setLocalStorage } from "./CountDownTimer";

export const LOCAL_STORAGE_PERSISTED_EMAIL = "email";

export interface EmailFormData {
  email?: string;
}
export interface EmailFormProps {
  // requestEmailLink: (event: React.FormEvent<HTMLFormElement>) => void;
  request_in_progress: boolean;
  invalid: boolean;
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  handleSubmit: any;
}

interface ValuesProps {
  [key: string]: string;
}

const EmailForm = (props: EmailFormProps): JSX.Element => {
  const { handleSubmit } = props;
  const dispatch = useAppDispatch();

  const submitEmailForm = (values: ValuesProps) => {
    const email = values.email;
    if (email) {
      dispatch(resetPasswordSlice.actions.requestEmailLink(email));
      setLocalStorage(LOCAL_STORAGE_PERSISTED_EMAIL, email);
    }
  };

  return (
    <Form id="reset-password-form" role="form" onSubmit={handleSubmit(submitEmailForm)}>
      <Field
        type="email"
        name="email"
        label={translate("profile.email_display_title")}
        componentClass="input"
        id="email-input"
        component={CustomInput}
        placeholder="name@example.com"
        required={true}
        helpBlock={translate("emails.input_help_text")}
      />
      <EduIDButton
        type="submit"
        className="settings-button"
        id="reset-password-button"
        disabled={props.invalid || props.request_in_progress}
      >
        {translate("resetpw.send-link")}
      </EduIDButton>
    </Form>
  );
};

const DecoratedEmailForm = reduxForm<EmailFormData, EmailFormProps>({
  form: "reset-pass-email-form",
  validate,
})(EmailForm);

connect(() => ({ touchOnChange: true, enableReinitialize: true, destroyOnUnmount: false }))(DecoratedEmailForm);

export default DecoratedEmailForm;

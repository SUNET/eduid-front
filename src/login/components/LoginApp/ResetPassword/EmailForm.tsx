import React from "react";
import { translate } from "../../../../login/translation";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form } from "reactstrap";
import CustomInput from "../../Inputs/CustomInput";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";
import { useAppDispatch } from "../../../app_init/hooks";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { setLocalStorage } from "./CountDownTimer";
import { useIntl } from "react-intl";

export const LOCAL_STORAGE_PERSISTED_EMAIL = "email";

export interface EmailFormData {
  email?: string;
}
export interface EmailFormProps {
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
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.email",
    defaultMessage: "name@example.com",
    description: "placeholder text for email input",
  });

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
        placeholder={placeholder}
        required={true}
        helpBlock={translate("emails.input_help_text")}
      />
      <div className="buttons">
        <EduIDButton
          type="submit"
          buttonstyle="primary"
          id="reset-password-button"
          disabled={props.invalid || props.request_in_progress}
        >
          {translate("resetpw.send-link")}
        </EduIDButton>
      </div>
    </Form>
  );
};

const DecoratedEmailForm = reduxForm<EmailFormData, EmailFormProps>({
  form: "reset-pass-email-form",
  validate,
})(EmailForm);

const ConnectedForm = connect(() => ({ touchOnChange: true, enableReinitialize: true, destroyOnUnmount: false }))(
  DecoratedEmailForm
);

export default ConnectedForm;

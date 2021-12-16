import EduIDButton from "components/EduIDButton";
import TextInput from "components/EduIDTextInput";
import { DashboardRootState } from "dashboard-init-app";
import { translate } from "login/translation";
import React, { useState } from "react";
import { connect } from "react-redux";
import ButtonGroup from "reactstrap/lib/ButtonGroup";
import FormText from "reactstrap/lib/FormText";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import PrimaryButton from "../login/components/Buttons/ButtonPrimary";
import { ChangePasswordChildFormProps } from "./ChangePasswordForm";

interface ChangePasswordSuggestedFormData {
  old?: string;
  suggested?: string;
}

interface FormData {
  name: string;
  value: string;
}

type ChangePasswordSuggestedInjectedProps = InjectedFormProps<
  ChangePasswordSuggestedFormData,
  ChangePasswordChildFormProps
>;

function BareChangePasswordSuggestedForm(props: ChangePasswordChildFormProps & ChangePasswordSuggestedInjectedProps) {
  const [formData, setFormData] = useState<ChangePasswordSuggestedFormData>({});

  // update component state with any changes to the form fields, so that we can get the values
  // on submit without going fishing in the DOM
  const formChange = (field: FormData) => {
    setFormData({ ...formData, [field.name]: field.value.trim() });
    props.updateFormDataCallback({ old: formData.old, new: formData.suggested });
  };

  return (
    <form
      id="passwordsview-form"
      role="form"
      onChange={(e) => {
        formChange(e.target as unknown as FormData);
      }}
    >
      <fieldset>
        <Field
          component={TextInput}
          componentClass="input"
          type="password"
          id="old-password-field"
          label={translate("chpass.old_password")}
          name="old"
        />
        <div className="form-field-error-area">
          <FormText />
        </div>
      </fieldset>
      <fieldset>
        <Field
          className="suggested-password"
          component={TextInput}
          componentClass="input"
          type="text"
          name="suggested"
          id="suggested-password-field"
          label={translate("chpass.suggested_password")}
          disabled={true}
        />
      </fieldset>
      <div id="password-suggestion">
        <ButtonGroup>
          <EduIDButton value="custom" className="btn-link" id="pwmode-button" onClick={props.togglePasswordType}>
            {translate("chpass.button_custom_password")}
          </EduIDButton>
        </ButtonGroup>
      </div>
      <div id="chpass-form" className="tabpane">
        <PrimaryButton
          id="chpass-button"
          className="settings-button"
          disabled={props.submitting || props.pristine || props.invalid}
          onClick={props.handleSubmit}
        >
          {translate("chpass.button_save_password")}
        </PrimaryButton>
        <EduIDButton className="cancel-button" onClick={props.handleCancel}>
          {translate("cm.cancel")}
        </EduIDButton>
      </div>
    </form>
  );
}

const validate = (values: ChangePasswordSuggestedFormData) => {
  const errors: { [key: string]: string } = {};
  if (!values.old) {
    errors.old = "required";
  }

  return errors;
};

const ReduxChangeSuggestedPasswordForm = reduxForm<ChangePasswordSuggestedFormData, ChangePasswordChildFormProps>({
  form: "chpass",
  validate,
})(BareChangePasswordSuggestedForm);

const ChangePasswordSuggestedForm = connect((state: DashboardRootState) => {
  const initialValues: { [key: string]: string } = {};
  if (state.chpass.suggested_password) {
    initialValues.suggested = state.chpass.suggested_password;
  }
  return {
    initialValues: initialValues,
    enableReinitialize: true,
  };
})(ReduxChangeSuggestedPasswordForm);

export default ChangePasswordSuggestedForm;

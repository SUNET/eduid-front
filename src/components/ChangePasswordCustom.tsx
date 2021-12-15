import { stopConfirmationPassword } from "actions/Security";
import { changePassword } from "apis/eduidSecurity";
import EduIDButton from "components/EduIDButton";
import TextInput from "components/EduIDTextInput";
import { useDashboardAppDispatch } from "dashboard-hooks";
import { DashboardRootState } from "dashboard-init-app";
import { translate } from "login/translation";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import ButtonGroup from "reactstrap/lib/ButtonGroup";
import FormText from "reactstrap/lib/FormText";
import { DecoratedFormProps, Field, InjectedFormProps, reduxForm } from "redux-form";
import PrimaryButton from "../login/components/Buttons/ButtonPrimary";
import { ChangePasswordChildFormProps } from "./ChangePasswordForm";

interface ChangePasswordCustomFormData {
  custom?: string;
  repeat?: string;
  old?: string;
}

interface FormData {
  name: string;
  value: string;
}

type ChangePasswordCustomInjectedProps = InjectedFormProps<ChangePasswordCustomFormData, ChangePasswordChildFormProps>;

function BareChangePasswordCustomForm(props: ChangePasswordChildFormProps & ChangePasswordCustomInjectedProps) {
  const [formData, setFormData] = useState<ChangePasswordCustomFormData>({});

  // update component state with any changes to the form fields, so that we can get the values
  // on submit without going fishing in the DOM
  const formChange = (field: FormData) => {
    setFormData({ ...formData, [field.name]: field.value.trim() });
    props.updateFormDataCallback({ old: formData.old, new: formData.custom });
  };

  const meterHelpBlock = [
    <meter max="4" value={props.password_score} id="password-strength-meter" key="0" />,
    <div className="form-field-error-area" key="1">
      <FormText>{translate(props.password_strength_msg)}</FormText>
    </div>,
  ];

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
      <div className="password-format">
        <label>{translate("chpass.help-text-newpass-label")}</label>
        <ul id="password-custom-help">
          {[
            <FormattedMessage
              defaultMessage={`Use upper- and lowercase characters, but not at the beginning or end`}
              description="help text for custom password tips"
            />,
            <FormattedMessage
              defaultMessage={`Add digits somewhere, but not at the beginning or end`}
              description="help text for custom password tips"
            />,
            <FormattedMessage
              defaultMessage={`Add special characters, such as  @ $ \ + _ %`}
              description="help text for custom password tips"
            />,
            <FormattedMessage defaultMessage={`Spaces are ignored`} description="help text for custom password tips" />,
          ].map((list, index) => {
            return <li key={index}>{list}</li>;
          })}
        </ul>
      </div>

      <fieldset>
        <div>
          <Field
            component={TextInput}
            componentClass="input"
            type="password"
            label={translate("chpass.form_custom_password")}
            helpBlock={meterHelpBlock}
            id="custom-password-field"
            name="custom"
          />
          <Field
            component={TextInput}
            componentClass="input"
            type="password"
            id="repeat-password-field"
            label={translate("chpass.form_custom_password_repeat")}
            name="repeat"
          />
        </div>
      </fieldset>
      <div id="password-suggestion">
        <ButtonGroup>
          <EduIDButton value="custom" className="btn-link" onClick={props.togglePasswordType}>
            {translate("chpass.button_suggest_password")}
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

const validate = (
  values: ChangePasswordCustomFormData,
  props: DecoratedFormProps<ChangePasswordCustomFormData, ChangePasswordChildFormProps, string>
) => {
  const errors: { [key: string]: string } = {};
  if (!values.old) {
    errors.old = "required";
  }

  if (!values.custom) {
    errors.custom = "required";
  } else if (props.custom_ready) {
    errors.custom = "chpass.low-password-entropy";
  }
  if (!values.repeat) {
    errors.repeat = "required";
  } else if (values.repeat !== values.custom) {
    errors.repeat = "chpass.different-repeat";
  }
  return errors;
};

const ReduxChangePasswordCustomForm = reduxForm<ChangePasswordCustomFormData, ChangePasswordChildFormProps>({
  form: "chpassCustom",
  validate,
})(BareChangePasswordCustomForm);

const ChangePasswordCustomForm = connect((state: DashboardRootState) => {
  const initialValues: { [key: string]: string } = {};
  //   if (state.chpass.) {
  //     initialValues[pwFieldSuggestedName] = state.chpass.suggested_password;
  //   }
  return {
    initialValues: initialValues,
    enableReinitialize: true,
  };
})(ReduxChangePasswordCustomForm);

export default ChangePasswordCustomForm;

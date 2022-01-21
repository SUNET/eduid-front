import EduIDButton from "components/EduIDButton";
import TextInput from "components/EduIDTextInput";
import { DashboardRootState } from "dashboard-init-app";
import { translate } from "login/translation";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { ButtonGroup, FormText } from "reactstrap";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import PrimaryButton from "../login/components/Buttons/ButtonPrimary";
import { ChangePasswordChildFormProps } from "./ChangePasswordForm";
import PasswordStrengthMeter, { PasswordStrengthData } from "./PasswordStrengthMeter";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChangePasswordCustomFormProps extends ChangePasswordChildFormProps {}

interface ChangePasswordCustomFormData {
  custom?: string;
  repeat?: string;
  old?: string;
  score?: number;
  too_weak?: boolean;
}

interface FormData {
  name: string;
  value: string;
}

type ChangePasswordCustomInjectedProps = InjectedFormProps<ChangePasswordCustomFormData, ChangePasswordCustomFormProps>;

function BareChangePasswordCustomForm(props: ChangePasswordCustomFormProps & ChangePasswordCustomInjectedProps) {
  const [formData, setFormData] = useState<ChangePasswordCustomFormData>({});
  const [passwordData, setPasswordData] = useState<PasswordStrengthData>({});

  // update component state with any changes to the form fields, so that we can get the values
  // on submit without going fishing in the DOM
  const formChange = (field: FormData) => {
    setFormData({ ...formData, [field.name]: field.value.trim() });
    props.updateFormDataCallback({ old: formData.old, new: formData.custom });
  };

  useEffect(() => {
    // Propagate score as calculated by the PasswordStrengthMeter (and passed back here using it's passScoreUp prop)
    // to the hidden input value of the form, so that it will be available in this forms validate() function.
    props.change("score", passwordData.score);
  }, [passwordData]);

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
            helpBlock={<PasswordStrengthMeter password={formData.custom} passStateUp={setPasswordData} />}
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
          <Field component={TextInput} componentClass="input" type="hidden" id="password-score-field" name="score" />
        </div>
      </fieldset>
      <div id="password-suggestion">
        <ButtonGroup>
          <EduIDButton value="suggested" className="btn-link" id="pwmode-button" onClick={props.togglePasswordType}>
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

const validate = (values: ChangePasswordCustomFormData) => {
  const errors: { [key: string]: string } = {};
  if (!values.old) {
    errors.old = "required";
  }

  if (!values.custom) {
    errors.custom = "required";
  } else if (!values.score || values.score < 2) {
    errors.custom = "chpass.low-password-entropy";
  }
  if (!values.repeat) {
    errors.repeat = "required";
  } else if (values.repeat !== values.custom) {
    errors.repeat = "chpass.different-repeat";
  }
  return errors;
};

const ReduxChangePasswordCustomForm = reduxForm<ChangePasswordCustomFormData, ChangePasswordCustomFormProps>({
  form: "chpassCustom",
  validate,
  enableReinitialize: true,
})(BareChangePasswordCustomForm);

function mapStateToProps(state: DashboardRootState) {
  const initialValues: ChangePasswordCustomFormData = { score: 0 };

  return {
    initialValues: initialValues,
  };
}

export default connect(mapStateToProps)(ReduxChangePasswordCustomForm);

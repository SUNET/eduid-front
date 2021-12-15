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
import { ChangePasswordProps } from "./ChangePassword";

export const pwFieldCustomName = "custom-password-field",
  pwFieldRepeatName = "repeat-password-field",
  pwFieldOldName = "old-password-field",
  pwFieldSuggestedName = "suggested-password-field",
  pwFieldChooser = "choose-custom-field";

interface ChangePasswordFormData {
  "custom-password-field"?: string;
  "repeat-password-field"?: string;
  "old-password-field"?: string;
  "suggested-password-field"?: string;
  "choose-custom-field"?: string;
}

interface FormData {
  name: string;
  value: string;
}

interface ChangePasswordFormProps extends ChangePasswordProps {
  suggested_password?: string;
  cancel_to: string; // URL to direct browser to when user cancels password change
}

type ChangePasswordInjectedProps = InjectedFormProps<ChangePasswordFormData, ChangePasswordFormProps>;

function ChangePasswordForm(props: ChangePasswordFormProps & ChangePasswordInjectedProps) {
  const [customPassword, setCustomPassword] = useState(false);
  const dispatch = useDashboardAppDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState<ChangePasswordFormData>({});

  // update component state with any changes to the form fields, so that we can get the values
  // on submit without going fishing in the DOM
  const formChange = (field: FormData) => {
    setFormData({ ...formData, [field.name]: field.value.trim() });
  };

  function togglePasswordType() {
    setCustomPassword(!customPassword);
  }

  function handleStartPasswordChange(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    const oldPassword = formData[pwFieldOldName];
    let newPassword = props.suggested_password;
    if (customPassword) {
      newPassword = formData[pwFieldCustomName];
    }
    if (oldPassword && newPassword) {
      dispatch(changePassword({ old_password: oldPassword, new_password: newPassword }));
    }
  }

  function handleStopPasswordChange(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    history.push(props.cancel_to);
    dispatch(stopConfirmationPassword());
  }

  let form, button, helpCustom;

  if (customPassword) {
    const meterHelpBlock = [
      <meter max="4" value={props.password_score} id="password-strength-meter" key="0" />,
      <div className="form-field-error-area" key="1">
        <FormText>{translate(props.password_strength_msg)}</FormText>
      </div>,
    ];

    button = (
      <EduIDButton value="custom" className="btn-link" onClick={() => togglePasswordType()}>
        {translate("chpass.button_suggest_password")}
      </EduIDButton>
    );

    form = (
      <div>
        <Field
          component={TextInput}
          componentClass="input"
          type="password"
          label={translate("chpass.form_custom_password")}
          helpBlock={meterHelpBlock}
          id={pwFieldCustomName}
          name={pwFieldCustomName}
        />
        <Field
          component={TextInput}
          componentClass="input"
          type="password"
          id={pwFieldRepeatName}
          label={translate("chpass.form_custom_password_repeat")}
          name={pwFieldRepeatName}
        />
      </div>
    );

    helpCustom = (
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
    );
  } else {
    form = (
      <Field
        className="suggested-password"
        component={TextInput}
        componentClass="input"
        type="text"
        name={pwFieldSuggestedName}
        id={pwFieldSuggestedName}
        label={translate("chpass.suggested_password")}
        disabled={true}
      />
    );
    button = (
      <EduIDButton value="custom" className="btn-link" onClick={() => togglePasswordType()}>
        {translate("chpass.button_custom_password")}
      </EduIDButton>
    );
  }

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
          id={pwFieldOldName}
          label={translate("chpass.old_password")}
          name={pwFieldOldName}
        />
        <div className="form-field-error-area">
          <FormText />
        </div>
      </fieldset>
      {helpCustom}
      <fieldset>{form}</fieldset>
      <div id="password-suggestion">
        <ButtonGroup>{button}</ButtonGroup>
      </div>
      <div id="chpass-form" className="tabpane">
        <PrimaryButton
          id="chpass-button"
          className="settings-button"
          disabled={props.submitting || props.pristine || props.invalid}
          onClick={handleStartPasswordChange}
        >
          {translate("chpass.button_save_password")}
        </PrimaryButton>
        <EduIDButton className="cancel-button" onClick={handleStopPasswordChange}>
          {translate("cm.cancel")}
        </EduIDButton>
      </div>
    </form>
  );
}

const validate = (
  values: ChangePasswordFormData,
  props: DecoratedFormProps<ChangePasswordFormData, ChangePasswordFormProps, string>
) => {
  const errors: { [key: string]: string } = {};
  if (!values[pwFieldOldName]) {
    errors[pwFieldOldName] = "required";
  }

  if (props.registeredFields && !props.registeredFields.hasOwnProperty(pwFieldSuggestedName)) {
    if (!values[pwFieldCustomName]) {
      errors[pwFieldCustomName] = "required";
    } else if (props.custom_ready) {
      errors[pwFieldCustomName] = "chpass.low-password-entropy";
    }
    if (!values[pwFieldRepeatName]) {
      errors[pwFieldRepeatName] = "required";
    } else if (values[pwFieldRepeatName] !== values[pwFieldCustomName]) {
      errors[pwFieldRepeatName] = "chpass.different-repeat";
    }
  }
  return errors;
};

const ChangePasswordReduxForm = reduxForm<ChangePasswordFormData, ChangePasswordFormProps>({
  form: "chpass",
  validate,
})(ChangePasswordForm);

const ConnectedChangePasswordForm = connect((state: DashboardRootState) => {
  const initialValues: { [key: string]: string } = {};
  if (state.chpass.suggested_password) {
    initialValues[pwFieldSuggestedName] = state.chpass.suggested_password;
  }
  return {
    initialValues: initialValues,
    enableReinitialize: true,
  };
})(ChangePasswordReduxForm);

// ChangePasswordForm.propTypes = {
//   user_input: PropTypes.array,
//   next_url: PropTypes.string,
//   password_entropy: PropTypes.number,
//   handleChoice: PropTypes.func,
//   noop: PropTypes.func,
//   handleStartPasswordChange: PropTypes.func,
//   cancel_to: PropTypes.string,
// };

export default ConnectedChangePasswordForm;

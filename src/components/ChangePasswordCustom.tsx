import EduIDButton from "components/EduIDButton";
import TextInput from "components/EduIDTextInput";
import { DashboardRootState } from "dashboard-init-app";
import { translate } from "login/translation";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { ButtonGroup, FormText } from "reactstrap";
import PrimaryButton from "../login/components/Buttons/ButtonPrimary";
import { ChangePasswordChildFormProps } from "./ChangePasswordForm";
import PasswordStrengthMeter, { PasswordStrengthData } from "./PasswordStrengthMeter";
import { Form as FinalForm, Field as FinalField } from "react-final-form";

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

export default function ChangePasswordCustomForm(props: ChangePasswordCustomFormProps) {
  const [formData, setFormData] = useState<ChangePasswordCustomFormData>({});
  const [passwordData, setPasswordData] = useState<PasswordStrengthData>({});

  useEffect(() => {
    // Propagate score as calculated by the PasswordStrengthMeter (and passed back here using it's passScoreUp prop)
    // to the hidden input value of the form, so that it will be available in this forms validate() function.
    props.change("score", passwordData.score);
  }, [passwordData]);

  return (
    <form id="passwordsview-form" role="form">
      <fieldset>
        <FinalField<string>
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
          <FinalField
            component={TextInput}
            componentClass="input"
            type="password"
            label={translate("chpass.form_custom_password")}
            helpBlock={<PasswordStrengthMeter password={formData.custom} passStateUp={setPasswordData} />}
            id="custom-password-field"
            name="custom"
          />
          <FinalField
            component={TextInput}
            componentClass="input"
            type="password"
            id="repeat-password-field"
            label={translate("chpass.form_custom_password_repeat")}
            name="repeat"
          />
          <FinalField
            component={TextInput}
            componentClass="input"
            type="hidden"
            id="password-score-field"
            name="score"
          />
        </div>
      </fieldset>
    </form>
  );
}

// const validate = (values: ChangePasswordCustomFormData) => {
//   const errors: { [key: string]: string } = {};
//   if (!values.old) {
//     errors.old = "required";
//   }

//   if (!values.custom) {
//     errors.custom = "required";
//   } else if (!values.score || values.score < 2) {
//     errors.custom = "chpass.low-password-entropy";
//   }
//   if (!values.repeat) {
//     errors.repeat = "required";
//   } else if (values.repeat !== values.custom) {
//     errors.repeat = "chpass.different-repeat";
//   }
//   return errors;
// };

// const ReduxChangePasswordCustomForm = reduxForm<ChangePasswordCustomFormData, ChangePasswordCustomFormProps>({
//   form: "chpassCustom",
//   validate,
//   enableReinitialize: true,
// })(BareChangePasswordCustomForm);

// function mapStateToProps(state: DashboardRootState) {
//   const initialValues: ChangePasswordCustomFormData = { score: 0 };

//   return {
//     initialValues: initialValues,
//   };
// }

// export default connect(mapStateToProps)(ReduxChangePasswordCustomForm);

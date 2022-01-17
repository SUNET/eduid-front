import TextInput from "components/EduIDTextInput";
import { useDashboardAppSelector } from "dashboard-hooks";
import { DashboardRootState } from "dashboard-init-app";
import { translate } from "login/translation";
import React, { useState } from "react";
import { connect } from "react-redux";
import { FormText } from "reactstrap";
import { ChangePasswordChildFormProps } from "./ChangePasswordForm";

import { Field as FinalField, Form as FinalForm, FormRenderProps } from "react-final-form";

interface ChangePasswordSuggestedFormData {
  old?: string;
  suggested?: string;
}

interface FormData {
  name: string;
  value: string;
}

export default function ChangePasswordSuggestedForm(props: ChangePasswordChildFormProps) {
  const suggested = useDashboardAppSelector((state) => state.chpass.suggested_password);

  return (
    <React.Fragment>
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
      <fieldset>
        <FinalField<string>
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
    </React.Fragment>
  );
}

// const validate = (values: ChangePasswordSuggestedFormData) => {
//   const errors: { [key: string]: string } = {};
//   if (!values.old) {
//     errors.old = "required";
//   }

//   return errors;
// };

// const ReduxChangeSuggestedPasswordForm = reduxForm<ChangePasswordSuggestedFormData, ChangePasswordChildFormProps>({
//   form: "chpass",
//   validate,
// })(BareChangePasswordSuggestedForm);

// const ChangePasswordSuggestedForm = connect((state: DashboardRootState) => {
//   const initialValues: { [key: string]: string } = {};
//   if (state.chpass.suggested_password) {
//     initialValues.suggested = state.chpass.suggested_password;
//   }
//   return {
//     initialValues: initialValues,
//     enableReinitialize: true,
//   };
// })(ReduxChangeSuggestedPasswordForm);

// export default ChangePasswordSuggestedForm;

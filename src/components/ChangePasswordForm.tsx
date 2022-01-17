import { changePassword } from "apis/eduidSecurity";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch } from "dashboard-hooks";
import { translate } from "login/translation";
import React, { useState } from "react";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { useHistory } from "react-router";
import { ButtonGroup } from "reactstrap";
import PrimaryButton from "../login/components/Buttons/ButtonPrimary";
import ChangePasswordCustomForm from "./ChangePasswordCustom";
import ChangePasswordSuggestedForm from "./ChangePasswordSuggested";

export interface ChangePasswordFormProps {
  cancel_to: string; // URL to direct browser to when user cancels password change
}

// These are the props we pass to the sub-components with the different forms
export interface ChangePasswordChildFormProps extends FormRenderProps<ChangePasswordFormData> {
  // togglePasswordType: () => void;
  // updateFormDataCallback: (values: ChangePasswordFormData) => void;
  // handleSubmit: (event: React.MouseEvent<HTMLElement>) => void;
  // handleCancel: (event: React.MouseEvent<HTMLElement>) => void;
}

interface ChangePasswordFormData {
  old?: string;
  new?: string;
}

function ChangePasswordForm(props: ChangePasswordFormProps) {
  const [renderSuggested, setRenderSuggested] = useState(true);
  const dispatch = useDashboardAppDispatch();
  const history = useHistory();

  function togglePasswordType() {
    // Toggle between rendering the suggested password form, or the custom password form
    setRenderSuggested(!renderSuggested);
  }

  async function handleSubmitPasswords(values: ChangePasswordFormData) {
    // Callback from sub-component when the user clicks on the button to change password
    if (values.old && values.new) {
      const response = await dispatch(changePassword({ old_password: values.old, new_password: values.new }));
      if (changePassword.fulfilled.match(response)) {
        history.push("security");
      }
    }
  }

  function handleCancel(event: React.MouseEvent<HTMLElement>) {
    // Callback from sub-component when the user clicks on the button to abort changing password
    event.preventDefault();
    history.push(props.cancel_to);
  }

  const child_props: ChangePasswordChildFormProps = {
    // togglePasswordType,
    // updateFormDataCallback,
    // handleSubmit,
    // handleCancel,
  };

  const initialValues = {};

  return (
    <FinalForm<ChangePasswordFormData>
      onSubmit={handleSubmitPasswords}
      initialValues={initialValues}
      render={(formProps) => {
        return (
          <React.Fragment>
            {renderSuggested ? (
              <ChangePasswordSuggestedForm {...child_props} />
            ) : (
              <ChangePasswordCustomForm {...child_props} />
            )}

            <div id="password-suggestion">
              <ButtonGroup>
                <EduIDButton value="custom" className="btn-link" id="pwmode-button" onClick={togglePasswordType}>
                  {translate("chpass.button_custom_password")}
                </EduIDButton>
              </ButtonGroup>
            </div>
            <div id="chpass-form" className="tabpane">
              <PrimaryButton
                id="chpass-button"
                className="settings-button"
                disabled={formProps.submitting || formProps.pristine || formProps.invalid}
                onClick={formProps.handleSubmit}
              >
                {translate("chpass.button_save_password")}
              </PrimaryButton>
              <EduIDButton className="cancel-button" onClick={handleCancel}>
                {translate("cm.cancel")}
              </EduIDButton>
            </div>
          </React.Fragment>
        );
      }}
    />
  );
}

export default ChangePasswordForm;

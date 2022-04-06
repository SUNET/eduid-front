import { changePassword } from "apis/eduidSecurity";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { translate } from "login/translation";
import React, { useState } from "react";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { useHistory } from "react-router";
import { ButtonGroup } from "reactstrap";
import ChangePasswordCustomForm from "./ChangePasswordCustom";
import ChangePasswordSuggestedForm from "./ChangePasswordSuggested";

export interface ChangePasswordFormProps {
  finish_url: string; // URL to direct browser to when user cancels password change, or completes it
}

// These are the props we pass to the sub-components with the different forms
export interface ChangePasswordChildFormProps {
  formProps: FormRenderProps<ChangePasswordFormData>;
}

interface ChangePasswordFormData {
  old?: string; // used by both modes
  custom?: string; // used with custom password
  score?: number; // used with custom password
  suggested?: string; // used with suggested password
}

function ChangePasswordForm(props: ChangePasswordFormProps) {
  const suggested = useDashboardAppSelector((state) => state.chpass.suggested_password);
  const [renderSuggested, setRenderSuggested] = useState(true); // toggle display of custom or suggested password forms
  const dispatch = useDashboardAppDispatch();
  const history = useHistory();

  function togglePasswordType() {
    // Toggle between rendering the suggested password form, or the custom password form
    setRenderSuggested(!renderSuggested);
  }

  async function handleSubmitPasswords(values: ChangePasswordFormData) {
    // Use the right form field for the currently displayed password mode
    const newPassword = renderSuggested ? values.suggested : values.custom;
    // Callback from sub-component when the user clicks on the button to change password
    if (values.old && newPassword) {
      const response = await dispatch(changePassword({ old_password: values.old, new_password: newPassword }));
      if (changePassword.fulfilled.match(response)) {
        history.push(props.finish_url);
      }
    }
  }

  function handleCancel(event: React.MouseEvent<HTMLElement>) {
    // Callback from sub-component when the user clicks on the button to abort changing password
    event.preventDefault();
    // TODO: should clear passwords from form to avoid browser password manager asking user to save the password
    history.push(props.finish_url);
  }

  const initialValues = { suggested };

  return (
    <FinalForm<ChangePasswordFormData>
      onSubmit={handleSubmitPasswords}
      initialValues={initialValues}
      render={(formProps) => {
        const child_props: ChangePasswordChildFormProps = { formProps };

        return (
          <React.Fragment>
            {renderSuggested ? (
              <ChangePasswordSuggestedForm {...child_props} />
            ) : (
              <ChangePasswordCustomForm {...child_props} />
            )}

            <div id="password-suggestion">
              <ButtonGroup>
                <EduIDButton buttonStyle="link" id="pwmode-button" onClick={togglePasswordType}>
                  {translate(renderSuggested ? "chpass.button_custom_password" : "chpass.button_suggest_password")}
                </EduIDButton>
              </ButtonGroup>
            </div>
            <div id="chpass-form" className="tabpane flex-buttons">
              <EduIDButton
                type="submit"
                id="chpass-button"
                buttonStyle="primary"
                disabled={formProps.submitting || formProps.invalid}
                onClick={formProps.handleSubmit}
              >
                {translate("chpass.button_save_password")}
              </EduIDButton>
              <EduIDButton buttonStyle="secondary" onClick={handleCancel}>
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

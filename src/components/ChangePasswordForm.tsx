import { changePassword } from "apis/eduidSecurity";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useState } from "react";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { useNavigate } from "react-router-dom";
import ChangePasswordCustomForm from "./ChangePasswordCustom";
import ChangePasswordSuggestedForm from "./ChangePasswordSuggested";
import { FormattedMessage } from "react-intl";

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
  const [switchRenderCustom, setSwitchRenderCustom] = useState<boolean>(false); // toggle display of custom or suggested password forms
  const dispatch = useDashboardAppDispatch();
  const navigate = useNavigate();

  async function handleSubmitPasswords(values: ChangePasswordFormData) {
    // Use the right form field for the currently displayed password mode
    const newPassword = !switchRenderCustom ? values.suggested : values.custom;
    // Callback from sub-component when the user clicks on the button to change password
    if (values.old && newPassword) {
      const response = await dispatch(changePassword({ old_password: values.old, new_password: newPassword }));
      if (changePassword.fulfilled.match(response)) {
        navigate(props.finish_url);
      }
    }
  }

  const initialValues = { suggested };

  function handleSwitchChange(): void {
    setSwitchRenderCustom(!switchRenderCustom);
  }

  return (
    <React.Fragment>
      <fieldset>
        <label className="toggle flex-between" htmlFor="password-mode">
          <FormattedMessage defaultMessage="I don't want to suggested password" description="Change password toggle" />
          <input onChange={handleSwitchChange} className="toggle-checkbox" type="checkbox" id="password-mode" />
          <div className="toggle-switch"></div>
        </label>
      </fieldset>

      <FinalForm<ChangePasswordFormData>
        onSubmit={handleSubmitPasswords}
        initialValues={initialValues}
        render={(formProps) => {
          const child_props: ChangePasswordChildFormProps = { formProps };

          return (
            <React.Fragment>
              {switchRenderCustom ? (
                <ChangePasswordCustomForm {...child_props} />
              ) : (
                <ChangePasswordSuggestedForm {...child_props} />
              )}
              <EduIDButton
                type="submit"
                id="chpass-button"
                buttonstyle="primary"
                disabled={formProps.submitting || formProps.invalid}
                onClick={formProps.handleSubmit}
              >
                <FormattedMessage defaultMessage="Save" description="button save" />
              </EduIDButton>
            </React.Fragment>
          );
        }}
      />
    </React.Fragment>
  );
}

export default ChangePasswordForm;

import { changePassword } from "apis/eduidSecurity";
import { useDashboardAppDispatch } from "dashboard-hooks";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { ChangePasswordProps } from "./ChangePassword";
import ChangePasswordCustomForm from "./ChangePasswordCustom";
import ChangePasswordSuggestedForm from "./ChangePasswordSuggested";

export interface ChangePasswordFormProps extends ChangePasswordProps {
  suggested_password?: string;
  cancel_to: string; // URL to direct browser to when user cancels password change
}

// These are the props we pass to the sub-components with the different forms
export interface ChangePasswordChildFormProps {
  togglePasswordType: () => void;
  updateFormDataCallback: (values: ChangePasswordFormData) => void;
  handleSubmit: (event: React.MouseEvent<HTMLElement>) => void;
  handleCancel: (event: React.MouseEvent<HTMLElement>) => void;
}

interface ChangePasswordFormData {
  old?: string;
  new?: string;
}

function ChangePasswordForm(props: ChangePasswordFormProps) {
  const [renderSuggested, setRenderSuggested] = useState(true);
  const [formData, setFormData] = useState<ChangePasswordFormData>({});
  const dispatch = useDashboardAppDispatch();
  const history = useHistory();

  function togglePasswordType() {
    // Toggle between rendering the suggested password form, or the custom password form
    setRenderSuggested(!renderSuggested);
  }

  function updateFormDataCallback(values: ChangePasswordFormData) {
    // Callback from the sub-components when the user enters old/new password
    setFormData(values);
  }

  function handleSubmit(event: React.MouseEvent<HTMLElement>) {
    // Callback from sub-component when the user clicks on the button to change password
    event.preventDefault();
    if (formData.old && formData.new) {
      dispatch(changePassword({ old_password: formData.old, new_password: formData.new }));
    }
  }

  function handleCancel(event: React.MouseEvent<HTMLElement>) {
    // Callback from sub-component when the user clicks on the button to abort changing password
    event.preventDefault();
    history.push(props.cancel_to);
  }

  const child_props: ChangePasswordChildFormProps = {
    togglePasswordType,
    updateFormDataCallback,
    handleSubmit,
    handleCancel,
  };

  return (
    <React.Fragment>
      {renderSuggested ? (
        <ChangePasswordSuggestedForm {...child_props} />
      ) : (
        <ChangePasswordCustomForm {...child_props} />
      )}
    </React.Fragment>
  );
}

export default ChangePasswordForm;

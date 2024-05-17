import { changePassword, fetchSuggestedPassword } from "apis/eduidSecurity";
import Splash from "components/Common/Splash";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect, useState } from "react";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import ChangePasswordCustomForm from "./ChangePasswordCustom";
import ChangePasswordSuggestedForm from "./ChangePasswordSuggested";

// exported for use in tests
export const finish_url = "/profile/security";

export interface ChangePasswordFormProps {
  finish_url: string; // URL to direct browser to when user cancels password change, or completes it
}

export interface ChangePasswordChildFormProps {
  formProps: FormRenderProps<ChangePasswordFormData>;
  handleCancel?: any;
}

interface ChangePasswordFormData {
  custom?: string; // used with custom password
  score?: number; // used with custom password
  suggested?: string; // used with suggested password
}

export function ChangePassword() {
  const suggested_password = useAppSelector((state) => state.chpass.suggested_password);
  const is_app_loaded = useAppSelector((state) => state.config.is_app_loaded);
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const suggested = useAppSelector((state) => state.chpass.suggested_password);
  const [renderSuggested, setRenderSuggested] = useState(true); // toggle display of custom or suggested password forms
  const navigate = useNavigate();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Change Password",
      defaultMessage: "Change Password | eduID",
    });
  }, []);

  useEffect(() => {
    if (is_app_loaded && suggested_password === undefined) {
      // call fetchSuggestedPassword once state.config.security_service_url is initialised
      dispatch(fetchSuggestedPassword());
    }
  }, [suggested_password, is_app_loaded]);

  async function handleSubmitPasswords(values: ChangePasswordFormData) {
    // Use the right form field for the currently displayed password mode
    const newPassword = renderSuggested ? values.suggested : values.custom;
    // Callback from sub-component when the user clicks on the button to change password
    if (newPassword) {
      const response = await dispatch(changePassword({ new_password: newPassword }));
      if (changePassword.fulfilled.match(response)) {
        navigate(finish_url);
      }
    }
  }

  function handleCancel(event: React.MouseEvent<HTMLElement>) {
    // Callback from sub-component when the user clicks on the button to abort changing password
    event.preventDefault();
    // TODO: should clear passwords from form to avoid browser password manager asking user to save the password
    navigate(finish_url);
  }

  const initialValues = { suggested };

  function handleSwitchChange() {
    setRenderSuggested(!renderSuggested);
  }

  return (
    <FinalForm<ChangePasswordFormData>
      onSubmit={handleSubmitPasswords}
      initialValues={initialValues}
      render={(formProps) => {
        const child_props: ChangePasswordChildFormProps = { formProps };

        return (
          <Splash showChildren={Boolean(suggested_password)}>
            {renderSuggested ? (
              <section className="intro">
                <h1>
                  <FormattedMessage
                    description="Change password - headline"
                    defaultMessage="Change password: Suggested password"
                  />
                </h1>
                <div className="lead">
                  <p>
                    <FormattedMessage
                      description="Change password - lead"
                      defaultMessage={`A strong password has been generated for you. To proceed you will need to copy 
                    the password in to the Repeat new password field and click Accept Password and save it for 
                    future use. Note: spaces in the generated password are there for legibility and will be
                     removed automatically if entered.`}
                    />
                  </p>
                </div>
              </section>
            ) : (
              <section className="intro">
                <h1>
                  <FormattedMessage
                    description="Change password - headline"
                    defaultMessage="Change password: Custom password"
                  />
                </h1>
                <div className="lead">
                  <p>
                    <FormattedMessage
                      description="Change password - lead"
                      defaultMessage={`When creating your own password. make sure it's strong enough to keep your 
                        accounts safe.`}
                    />
                  </p>
                </div>
              </section>
            )}

            <fieldset className="toggle-change-password-options">
              <form>
                <label className="toggle flex-between" htmlFor="change-custom-password">
                  <FormattedMessage defaultMessage="Create a custom password?" description="change custom password" />
                  <input
                    onChange={handleSwitchChange}
                    className="toggle-checkbox"
                    type="checkbox"
                    checked={!renderSuggested}
                    id="change-custom-password"
                  />
                  <div className="toggle-switch"></div>
                </label>
              </form>
              <p className="help-text">
                <FormattedMessage
                  defaultMessage="Toggle the custom password switch to set your own password."
                  description="Change password toggle"
                />
              </p>
            </fieldset>
            {renderSuggested ? (
              <ChangePasswordSuggestedForm {...child_props} handleCancel={handleCancel} />
            ) : (
              <ChangePasswordCustomForm {...child_props} handleCancel={handleCancel} />
            )}
          </Splash>
        );
      }}
    />
  );
}

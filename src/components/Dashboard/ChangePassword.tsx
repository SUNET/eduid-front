import { changePassword, fetchSuggestedPassword } from "apis/eduidSecurity";
import Splash from "components/Common/Splash";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect, useState } from "react";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { clearNotifications } from "slices/Notifications";
import { AuthenticateModal } from "./Authenticate";
import ChangePasswordCustomForm from "./ChangePasswordCustom";
import ChangePasswordSuggestedForm from "./ChangePasswordSuggested";
import { ChangePasswordSwitchToggle } from "./ChangePasswordSwitchToggle";

// exported for use in tests
export const finish_url = "/profile/security";

export interface ChangePasswordFormProps {
  finish_url: string; // URL to direct browser to when user cancels password change, or completes it
}

export interface ChangePasswordChildFormProps {
  formProps: FormRenderProps<ChangePasswordFormData>;
  handleCancel?: (event: React.MouseEvent<HTMLElement>) => void;
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
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Change Password",
      defaultMessage: "Change Password | eduID",
    });
  }, []);

  useEffect(() => {
    if (is_app_loaded && suggested_password === undefined) {
      handleSuggestedPassword();
    }
  }, [suggested_password, is_app_loaded]);

  async function handleSuggestedPassword() {
    const response = await dispatch(fetchSuggestedPassword());
    if (fetchSuggestedPassword.rejected.match(response)) {
      if ((response.payload as any)?.payload.message === "authn_status.must-authenticate") {
        dispatch(clearNotifications());
        setShowModal(true);
      } else navigate(finish_url);
    }
  }

  async function handleSubmitPasswords(values: ChangePasswordFormData) {
    // Use the right form field for the currently displayed password mode
    const newPassword = renderSuggested ? values.suggested : values.custom;

    // Callback from sub-component when the user clicks on the button to change password
    if (newPassword) {
      const response = await dispatch(changePassword({ new_password: newPassword }));
      if (changePassword.fulfilled.match(response)) {
        navigate("/profile/chpass/success", {
          state: newPassword,
        });
      }
    }
  }

  function handleCancel(event: React.MouseEvent<HTMLElement>) {
    // Callback from sub-component when the user clicks on the button to abort changing password
    event.preventDefault();

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
                    future use.`}
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
            <ChangePasswordSwitchToggle handleSwitchChange={handleSwitchChange} renderSuggested={renderSuggested} />
            {renderSuggested ? (
              <ChangePasswordSuggestedForm {...child_props} handleCancel={handleCancel} />
            ) : (
              <ChangePasswordCustomForm {...child_props} handleCancel={handleCancel} />
            )}
            <AuthenticateModal
              action="changepwAuthn"
              dispatch={dispatch}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </Splash>
        );
      }}
    />
  );
}

import securityApi from "apis/eduidSecurity";
import Splash from "components/Common/Splash";
import { useAppSelector } from "eduid-hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router";
import ChangePasswordCustomForm from "./ChangePasswordCustom";
import { ChangePasswordRadioOption } from "./ChangePasswordRadioOption";
import ChangePasswordSuggestedForm from "./ChangePasswordSuggested";

// exported for use in tests
export const finish_url = "/profile/account";

export interface ChangePasswordFormProps {
  finish_url: string; // URL to direct browser to when user cancels password change, or completes it
}

export interface ChangePasswordChildFormProps {
  formProps: FormRenderProps<ChangePasswordFormData>;
  handleCancel?: (event: React.MouseEvent<HTMLElement>) => void;
  suggestedPassword?: string;
}

export interface ChangePasswordFormData {
  custom?: string; // used with custom password
  score?: number; // used with custom password
  suggested?: string; // used with suggested password
}

export interface ChangePasswordSuccessState {
  password: string; // user password
  isSuggested: boolean; // is it a generated password from server?
}

export function ChangePassword() {
  const is_app_loaded = useAppSelector((state) => state.config.is_app_loaded);
  const intl = useIntl();
  const suggested = useAppSelector((state) => state.chpass.suggested_password);
  const [renderSuggested, setRenderSuggested] = useState(true); // toggle display of custom or suggested password forms
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const [fetchSuggestedPassword] = securityApi.useLazyFetchSuggestedPasswordQuery();
  const [changePassword] = securityApi.useLazyChangePasswordQuery();

  const handleSuggestedPassword = useCallback(async () => {
    try {
      const response = await fetchSuggestedPassword();
      if (isMounted.current) {
        if (response.isSuccess) {
          navigate("/profile/chpass");
        }
      }
    } catch (error) {
      console.error("Error handleSuggestedPassword:", error);
    }
  }, [fetchSuggestedPassword, navigate]);

  const handleSubmitNewPassword = useCallback(
    async (values: ChangePasswordFormData) => {
      const newPassword = renderSuggested ? values.suggested : values.custom;
      if (newPassword) {
        const response = await changePassword({ new_password: newPassword });
        if (response.isSuccess) {
          navigate("/profile/chpass/success", {
            state: { password: newPassword, isSuggested: renderSuggested } as ChangePasswordSuccessState,
          });
        }
      }
    },
    [renderSuggested, changePassword, navigate]
  );

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      // Callback from sub-component when the user clicks on the button to abort changing password
      event.preventDefault();

      navigate(finish_url);
    },
    [navigate]
  );

  const initialValues = { suggested };

  const handleSwitchChange = useCallback(() => {
    setRenderSuggested(!renderSuggested);
  }, [renderSuggested]);

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Change Password",
      defaultMessage: "Change password | eduID",
    });
  }, [intl]);

  useEffect(() => {
    //TODO: Too many conditions for getting the suggested password, need to refactor.
    if (is_app_loaded && suggested === undefined && !window.location.pathname.includes("success")) {
      handleSuggestedPassword();
    }
    return () => {
      isMounted.current = false;
    };
  }, [suggested, is_app_loaded, handleSuggestedPassword]);

  return (
    <FinalForm<ChangePasswordFormData>
      onSubmit={handleSubmitNewPassword}
      initialValues={initialValues}
      render={(formProps) => {
        const child_props: ChangePasswordChildFormProps = { formProps };
        return (
          <Splash showChildren={Boolean(suggested)}>
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
                      description="Generated password - lead"
                      defaultMessage={`A strong password has been generated for you. To proceed you will need to copy 
                    the password in to the Repeat new password field and click the Save button to store it for 
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
                    defaultMessage="Change password: Set your own password"
                  />
                </h1>
                <div className="lead">
                  <p>
                    <FormattedMessage
                      description="Strong password - lead"
                      defaultMessage={`When creating your own password, make sure it's strong enough to keep your 
                        accounts safe.`}
                    />
                  </p>
                </div>
              </section>
            )}
            <ChangePasswordRadioOption handleSwitchChange={handleSwitchChange} renderSuggested={renderSuggested} />
            {renderSuggested ? (
              <ChangePasswordSuggestedForm {...child_props} handleCancel={handleCancel} suggestedPassword={suggested} />
            ) : (
              <ChangePasswordCustomForm
                {...child_props}
                handleCancel={handleCancel}
                handleSubmit={handleSubmitNewPassword}
              />
            )}
          </Splash>
        );
      }}
    />
  );
}

import { loginApi } from "apis/eduidLogin";
import { signupApi } from "apis/eduidSignup";
import { ConfirmUserInfo, EmailFieldset } from "components/Common/ConfirmUserInfo";
import EduIDButton from "components/Common/EduIDButton";
import { NewPasswordFormData } from "components/Common/NewPasswordForm";
import Splash from "components/Common/Splash";
import { WizardLink } from "components/Common/WizardLink";
import { ChangePasswordChildFormProps } from "components/Dashboard/ChangePassword";
import ChangePasswordCustomForm from "components/Dashboard/ChangePasswordCustom";
import { ChangePasswordRadioOption } from "components/Dashboard/ChangePasswordRadioOption";
import ChangePasswordSuggestedForm from "components/Dashboard/ChangePasswordSuggested";
import { SIGNUP_BASE_PATH } from "components/IndexMain";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { EduIDAppDispatch } from "eduid-init-app";
import { useState } from "react";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router";
import { signupSlice } from "slices/Signup";
import { ServiceInfo } from "./SignupEntry";
import { SignupStepIndicator } from "./SignupStepIndicator";

// element ids used in tests
export const idUserEmail = "user-email";
export const idUserPassword = "user-password";
export const idFinishedButton = "finished-button";

export function handleCreateUserError(
  error: unknown,
  fetchLogout: (arg: Record<string, never>) => void,
  dispatch: EduIDAppDispatch,
) {
  const err = error as { data?: { payload?: { message?: string } } };
  const message = err.data?.payload?.message ?? (err as unknown as { payload?: { message?: string } }).payload?.message;

  if (message === "signup.captcha-not-completed" || message === "signup.external-mfa-too-old") {
    fetchLogout({});
    dispatch(signupSlice.actions.setNextPage("SIGNUP_ENTRY"));
  } else {
    dispatch(signupSlice.actions.setNextPage("SIGNUP_CREDENTIALS_ERROR"));
  }
}

export function SignupConfirmPassword() {
  const dispatch = useAppDispatch();
  const signupState = useAppSelector((state) => state.signup.state);
  const [renderSuggested, setRenderSuggested] = useState(true);
  const navigate = useNavigate();
  const [createUser] = signupApi.useLazyCreateUserRequestQuery();
  const webauthnRegistered = signupState?.credentials?.webauthn_registered ?? false;
  const intl = useIntl();
  const [fetchLogout] = loginApi.useLazyFetchLogoutQuery();

  async function submitNewPasswordForm(values: NewPasswordFormData) {
    const newPassword = renderSuggested ? values.suggested : values.custom;
    if (!newPassword) {
      return;
    }

    const response = await createUser({
      use_webauthn: webauthnRegistered,
      use_suggested_password: renderSuggested,
      custom_password: renderSuggested ? undefined : newPassword,
    });

    if (response.isSuccess) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_USER_CREATED"));
    } else if (response.error) {
      handleCreateUserError(response.error, fetchLogout, dispatch);
    }
  }

  function handleSwitchChange() {
    setRenderSuggested(!renderSuggested);
  }

  function handleCancel(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    dispatch(signupSlice.actions.setNextPage("SIGNUP_ENTRY"));
    navigate(SIGNUP_BASE_PATH);
  }

  const suggested = signupState?.credentials.generated_password;
  const initialValues = { suggested };

  return (
    <FinalForm<NewPasswordFormData>
      onSubmit={submitNewPasswordForm}
      initialValues={initialValues}
      render={(formProps) => {
        const child_props: ChangePasswordChildFormProps = { formProps };
        return (
          <Splash showChildren={Boolean(signupState?.credentials.generated_password)}>
            <div className="step-container">
              {renderSuggested ? (
                <section className="intro">
                  <h1>
                    <FormattedMessage
                      defaultMessage="Create eduID: Register a suggested password"
                      description="Registration confirm password"
                    />
                  </h1>
                  <ServiceInfo />
                  <div className="lead">
                    <p>
                      <FormattedMessage
                        defaultMessage={`A strong password has been generated for you. Copy, paste and save it in the form below, or choose to create your own password.`}
                        description="Generated password - lead"
                      />
                    </p>
                  </div>
                </section>
              ) : (
                <section className="intro">
                  <h1>
                    <FormattedMessage
                      description="Register - headline"
                      defaultMessage="Create eduID: Register your own password"
                    />
                  </h1>
                  <ServiceInfo />
                  <div className="lead">
                    <p>
                      <FormattedMessage
                        description="Strong password - lead"
                        defaultMessage={`Create a strong enough password to keep your 
                        account safe.`}
                      />
                    </p>
                  </div>
                </section>
              )}
              <ChangePasswordRadioOption handleSwitchChange={handleSwitchChange} renderSuggested={renderSuggested} />
              {renderSuggested ? (
                <ChangePasswordSuggestedForm
                  {...child_props}
                  handleCancel={handleCancel}
                  suggestedPassword={formatPassword(suggested)}
                />
              ) : (
                <ChangePasswordCustomForm
                  {...child_props}
                  handleCancel={handleCancel}
                  handleSubmit={submitNewPasswordForm}
                />
              )}
              <div className="mfa-alternative">
                <WizardLink
                  previousText={
                    webauthnRegistered
                      ? intl.formatMessage({
                          id: "wizard link back to your security key",
                          defaultMessage: "Back to your added security key",
                        })
                      : intl.formatMessage({
                          id: "wizard link back to add a security key",
                          defaultMessage: "Also add a security key?",
                        })
                  }
                  previousOnClick={() => dispatch(signupSlice.actions.setNextPage("SIGNUP_MFA"))}
                />
              </div>
              <SignupStepIndicator currentStep={6} />
            </div>
          </Splash>
        );
      }}
    />
  );
}

export function SignupUserCreated(): React.JSX.Element {
  const signupState = useAppSelector((state) => state.signup.state);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
  const webauthnRegistered = signupState?.credentials?.webauthn_registered ?? false;
  const idpRequestRef = signupState?.idp_request_ref;
  const [signupAuthn] = loginApi.useLazySignupAuthnQuery();
  const idp_service_info = signupState?.idp_service_info;
  const locale = useAppSelector((state) => state.intl.locale);
  const service_name = idp_service_info?.display_name?.[locale] || idp_service_info?.display_name?.["en"] || undefined;

  async function handleFinish() {
    if (idpRequestRef) {
      const signupResponse = await signupAuthn({ ref: idpRequestRef });
      if (signupResponse.data?.payload?.finished) {
        globalThis.location.href = `/login/${idpRequestRef}`;
        return;
      }
    } else {
      globalThis.location.href = dashboard_link ?? "/";
    }
  }

  return (
    <div className="step-container">
      <section className="intro">
        <h1>
          <FormattedMessage defaultMessage="Create eduID: Completed" description="Registration complete" />
        </h1>
        <ServiceInfo />
        <div className="lead">
          {webauthnRegistered &&
          !signupState?.credentials.custom_password &&
          !signupState?.credentials.generated_password ? (
            <p>
              <FormattedMessage
                defaultMessage="Your eduID account has been created and you can continue using it with the details you have provided and your added security key."
                description="Registration finished with webauthn only"
              />
            </p>
          ) : (
            <p>
              <FormattedMessage
                defaultMessage={`Your eduID account has been created and you can continue using it with the details you have provided.`}
                description="Registration finished with pw"
              />
            </p>
          )}
        </div>
      </section>

      <figure className="signin-details">
        {signupState?.credentials.custom_password || webauthnRegistered ? (
          <div className="email-display">
            <EmailFieldset email={signupState?.email.address} />
          </div>
        ) : (
          <ConfirmUserInfo
            email_address={signupState?.email.address ?? ""}
            new_password={formatPassword(signupState?.credentials.generated_password)}
          />
        )}
      </figure>

      <div className="buttons">
        <EduIDButton id={idFinishedButton} buttonstyle="link normal-case" onClick={handleFinish}>
          {service_name ? (
            <FormattedMessage
              defaultMessage="Continue to {service_name}"
              description="go to service after signup"
              values={{
                service_name: <strong>{service_name}</strong>,
              }}
            />
          ) : (
            <FormattedMessage defaultMessage="Go to eduID to login" description="go to eduID link text" />
          )}
        </EduIDButton>
      </div>

      <p className="hint">
        Note: Sign in to eduID.se anytime to manage your account settings, e.g. add more keys, change password, update
        name and verify your identity. Read more about eduID in the help content accessible in the footer.
      </p>
      <SignupStepIndicator currentStep={7} totalSteps={6} />
    </div>
  );
}

// Show passwords in groups of four characters.
// Export this for use in tests.
export function formatPassword(data?: string): string {
  if (!data) {
    return "";
  }
  const res = data.match(/.{1,4}/g);
  if (res) {
    return res.join(" ");
  }
  return "";
}

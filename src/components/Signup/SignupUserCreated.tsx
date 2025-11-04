import { signupApi } from "apis/eduidSignup";
import { ConfirmUserInfo, EmailFieldset } from "components/Common/ConfirmUserInfo";
import EduIDButton from "components/Common/EduIDButton";
import { NewPasswordFormData } from "components/Common/NewPasswordForm";
import Splash from "components/Common/Splash";
import { ChangePasswordChildFormProps } from "components/Dashboard/ChangePassword";
import ChangePasswordCustomForm from "components/Dashboard/ChangePasswordCustom";
import { ChangePasswordRadioOption } from "components/Dashboard/ChangePasswordRadioOption";
import ChangePasswordSuggestedForm from "components/Dashboard/ChangePasswordSuggested";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useState } from "react";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";
import { clearNotifications } from "slices/Notifications";
import { signupSlice } from "slices/Signup";

// element ids used in tests
export const idUserEmail = "user-email";
export const idUserPassword = "user-password";
export const idFinishedButton = "finished-button";

export function SignupConfirmPassword() {
  const dispatch = useAppDispatch();
  const signupState = useAppSelector((state) => state.signup.state);
  const [renderSuggested, setRenderSuggested] = useState(true);
  const navigate = useNavigate();
  const [createUser] = signupApi.useLazyCreateUserRequestQuery();

  async function submitNewPasswordForm(values: NewPasswordFormData) {
    const newPassword = renderSuggested ? values.suggested : values.custom;
    if (!newPassword) {
      return;
    } else {
      const response = await createUser({
        use_suggested_password: renderSuggested,
        custom_password: renderSuggested ? undefined : newPassword,
      });

      if (response.isSuccess) {
        dispatch(clearNotifications());
        dispatch(signupSlice.actions.setNextPage("SignupUserCreated"));
      } else {
        dispatch(signupSlice.actions.setNextPage("SignupCredentials"));
      }
    }
  }

  function handleSwitchChange() {
    setRenderSuggested(!renderSuggested);
  }

  function handleCancel(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    dispatch(signupSlice.actions.setNextPage("SignupEmailForm"));
    navigate("/register");
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
            {renderSuggested ? (
              <section className="intro">
                <h1>
                  <FormattedMessage
                    defaultMessage="Register: Suggested password"
                    description="Registration confirm password"
                  />
                </h1>
                <div className="lead">
                  <p>
                    <FormattedMessage
                      defaultMessage={`A strong password has been generated for you. To proceed you will need to copy
                        the password in to the Repeat new password field and click the Save button to store it for future use.`}
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
                    defaultMessage="Register: Set your own password"
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
          </Splash>
        );
      }}
    />
  );
}

export function SignupUserCreated(): React.JSX.Element {
  const signupState = useAppSelector((state) => state.signup.state);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  return (
    <form method="GET" action={dashboard_link}>
      <h1>
        <FormattedMessage defaultMessage="Register: Completed" description="Registration complete" />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage={`These are your login details for eduID. 
              Save or remember the password! Note: spaces in the password are there for legibility and will be removed automatically if entered. Once you've logged in it is possible to change your password.`}
            description="Registration finished"
          />
        </p>
      </div>
      {signupState?.credentials.custom_password ? (
        <div className="email-display">
          <EmailFieldset email={signupState?.email.address} />
        </div>
      ) : (
        <ConfirmUserInfo
          email_address={signupState?.email.address as string}
          new_password={formatPassword(signupState?.credentials.generated_password)}
        />
      )}

      <div className="buttons">
        <EduIDButton id={idFinishedButton} buttonstyle="link normal-case" type="submit">
          <FormattedMessage defaultMessage="Go to eduid to login" description="go to eduID link text" />
        </EduIDButton>
      </div>
    </form>
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

import { createUserRequest } from "apis/eduidSignup";
import { ConfirmUserInfo } from "components/Common/ConfirmUserInfo";
import EduIDButton from "components/Common/EduIDButton";
import { NewPasswordFormData } from "components/Common/NewPasswordForm";
import Splash from "components/Common/Splash";
import { ChangePasswordChildFormProps } from "components/Dashboard/ChangePassword";
import ChangePasswordCustomForm from "components/Dashboard/ChangePasswordCustom";
import { ChangePasswordRadioOption } from "components/Dashboard/ChangePasswordRadioOption";
import ChangePasswordSuggestedForm from "components/Dashboard/ChangePasswordSuggested";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useContext, useRef, useState } from "react";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { clearNotifications } from "slices/Notifications";
import { SignupGlobalStateContext } from "./SignupGlobalState";

// element ids used in tests
export const idUserEmail = "user-email";
export const idUserPassword = "user-password";
export const idFinishedButton = "finished-button";

export function SignupConfirmPassword() {
  const dispatch = useAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);
  const signupState = useAppSelector((state) => state.signup.state);
  const ref = useRef<HTMLInputElement>(null);
  const [renderSuggested, setRenderSuggested] = useState(true);
  const navigate = useNavigate();

  async function submitNewPasswordForm(values: NewPasswordFormData) {
    const newPassword = values.suggested;
    if (!newPassword) {
      return;
    } else {
      const res = await dispatch(createUserRequest({ use_suggested_password: true }));

      if (createUserRequest.fulfilled.match(res)) {
        dispatch(clearNotifications());
        signupContext.signupService.send({ type: "API_SUCCESS" });
      } else {
        signupContext.signupService.send({ type: "API_FAIL" });
      }
    }
  }

  function handleSwitchChange() {
    setRenderSuggested(!renderSuggested);
  }

  function handleCancel(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    signupContext.signupService.send({ type: "ABORT" });
    navigate("/register");
  }

  const suggested = signupState?.credentials.generated_password;
  const initialValues = { suggested };

  return (
    <FinalForm<any>
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
                    the password in to the Repeat new password field and click Accept Password and save it for 
                    future use.`}
                      description="Registration copy and paste password"
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
                      description="Register - lead"
                      defaultMessage={`When creating your own password. make sure it's strong enough to keep your 
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
              <ChangePasswordCustomForm {...child_props} handleCancel={handleCancel} />
            )}
          </Splash>
        );
      }}
    />
  );
}

export function SignupUserCreated(): JSX.Element {
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
              Save the password! Note: spaces in the generated password are there for legibility and will be removed automatically if entered. Once you've logged in it is possible to change your password.`}
            description="Registration finished"
          />
        </p>
      </div>
      <ConfirmUserInfo
        email_address={signupState?.email.address as string}
        new_password={
          signupState?.credentials.custom_password
            ? signupState?.credentials.custom_password
            : formatPassword(signupState?.credentials.generated_password)
        }
      />
      <div className="buttons">
        <EduIDButton id={idFinishedButton} buttonstyle="link" className="normal-case" type="submit">
          <FormattedMessage defaultMessage="Go to eduid to login" description="go to eudID link text" />
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

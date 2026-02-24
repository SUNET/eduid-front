import { resetPasswordApi } from "apis/eduidResetPassword";
import { ConfirmUserInfo, EmailFieldset } from "components/Common/ConfirmUserInfo";
import EduIDButton from "components/Common/EduIDButton";
import { NewPasswordFormData } from "components/Common/NewPasswordForm";
import Splash from "components/Common/Splash";
import { ChangePasswordChildFormProps, ChangePasswordFormData } from "components/Dashboard/ChangePassword";
import ChangePasswordCustomForm from "components/Dashboard/ChangePasswordCustom";
import { ChangePasswordRadioOption } from "components/Dashboard/ChangePasswordRadioOption";
import ChangePasswordSuggestedForm from "components/Dashboard/ChangePasswordSuggested";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect, useState } from "react";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import resetPasswordSlice from "slices/ResetPassword";

export function SetNewPassword(): React.JSX.Element | null {
  const suggested = useAppSelector((state) => state.resetPassword.suggested_password);
  const dispatch = useAppDispatch();
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);
  const email_code = useAppSelector((state) => state.resetPassword.email_code);
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const [renderSuggested, setRenderSuggested] = useState(true);
  const [postSetNewPasswordExternalMfa] = resetPasswordApi.useLazyPostSetNewPasswordExternalMfaQuery();
  const [postSetNewPasswordExtraSecurityToken] = resetPasswordApi.useLazyPostSetNewPasswordExtraSecurityTokenQuery();
  const [postSetNewPassword] = resetPasswordApi.useLazyPostSetNewPasswordQuery();
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  useEffect(() => {
    dispatch(resetPasswordSlice.actions.useSuggestedPassword(renderSuggested));
  }, [dispatch, renderSuggested, suggested]);

  function handleCancel() {
    if (dashboard_link) {
      dispatch(resetPasswordSlice.actions.resetState());
      document.location.href = dashboard_link;
    }
  }

  async function submitNewPassword(values: NewPasswordFormData) {
    const newPassword = renderSuggested ? values.suggested : values.custom;

    if (!newPassword || !email_code) {
      return;
    }

    dispatch(resetPasswordSlice.actions.storeNewPassword(newPassword));
    if (!selected_option || selected_option === "without") {
      const response = await postSetNewPassword({ email_code: email_code, password: newPassword });
      if (response.isSuccess) {
        dispatch(resetPasswordSlice.actions.setNextPage("RESET_PW_SUCCESS"));
      }
    } else if (selected_option === "securityKey" && webauthn_assertion) {
      const response = await postSetNewPasswordExtraSecurityToken({
        email_code: email_code,
        password: newPassword,
        webauthn_response: webauthn_assertion,
      });
      if (response.isSuccess) {
        dispatch(resetPasswordSlice.actions.setNextPage("RESET_PW_SUCCESS"));
      }
    } else if (selected_option === "recoveryOption") {
      const response = await postSetNewPasswordExternalMfa({
        email_code: email_code,
        password: newPassword,
      });
      if (response.isSuccess) {
        dispatch(resetPasswordSlice.actions.setNextPage("RESET_PW_SUCCESS"));
      }
    }
  }

  if (suggested === undefined) {
    return null;
  }

  function handleSwitchChange() {
    setRenderSuggested(!renderSuggested);
  }

  const initialValues = { suggested };

  return (
    <FinalForm<ChangePasswordFormData>
      onSubmit={submitNewPassword}
      initialValues={initialValues}
      render={(formProps) => {
        const child_props: ChangePasswordChildFormProps = { formProps };
        return (
          <Splash showChildren={Boolean(suggested)}>
            {renderSuggested ? (
              <section className="intro">
                <h1>
                  <FormattedMessage
                    description="Reset Password - headline"
                    defaultMessage="Reset Password: Suggested password"
                  />
                </h1>
                <div className="lead">
                  <p>
                    <FormattedMessage
                      description="Generated password - lead"
                      defaultMessage={`A strong password has been generated for you. To proceed you will need to copy 
                        the password in to the Repeat new password field and click the Save button to store it for future use.`}
                    />
                  </p>
                </div>
              </section>
            ) : (
              <section className="intro">
                <h1>
                  <FormattedMessage
                    description="Reset Password - headline"
                    defaultMessage="Reset Password: Set your own password"
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
              <ChangePasswordCustomForm {...child_props} handleCancel={handleCancel} handleSubmit={submitNewPassword} />
            )}
          </Splash>
        );
      }}
    />
  );
}

export function ResetPasswordSuccess(): React.JSX.Element {
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const new_password = useAppSelector((state) => state.resetPassword.new_password);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
  const suggested = useAppSelector((state) => state.resetPassword.suggested);

  return (
    <form method="GET" action={dashboard_link}>
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Reset Password: Completed"
            description="Reset Password set new password success heading"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage={`You have successfully updated your password. Make sure to store your password securely for future use. 
                Once you've logged in it is possible to change your password.`}
              description="Reset Password set new password success lead"
            />
          </p>
        </div>
      </section>
      {!suggested ? (
        <div className="email-display">
          <EmailFieldset email={email_address} />
        </div>
      ) : (
        <ConfirmUserInfo email_address={email_address as string} new_password={new_password as string} />
      )}

      <div className="buttons">
        <EduIDButton id="reset-password-finished" buttonstyle="link normal-case" type="submit">
          <FormattedMessage defaultMessage="Go to eduid to login" description="go to eduID link text" />
        </EduIDButton>
      </div>
    </form>
  );
}

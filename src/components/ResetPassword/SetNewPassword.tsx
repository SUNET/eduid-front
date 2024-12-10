import {
  postSetNewPassword,
  postSetNewPasswordExternalMfa,
  postSetNewPasswordExtraSecurityPhone,
  postSetNewPasswordExtraSecurityToken,
} from "apis/eduidResetPassword";
import { ConfirmUserInfo, EmailFieldset } from "components/Common/ConfirmUserInfo";
import EduIDButton from "components/Common/EduIDButton";
import { NewPasswordFormData } from "components/Common/NewPasswordForm";
import Splash from "components/Common/Splash";
import { ChangePasswordChildFormProps, ChangePasswordFormData } from "components/Dashboard/ChangePassword";
import ChangePasswordCustomForm from "components/Dashboard/ChangePasswordCustom";
import { ChangePasswordRadioOption } from "components/Dashboard/ChangePasswordRadioOption";
import ChangePasswordSuggestedForm from "components/Dashboard/ChangePasswordSuggested";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useContext, useEffect, useState } from "react";
import { Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import resetPasswordSlice from "slices/ResetPassword";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

export function SetNewPassword(): JSX.Element | null {
  const suggested = useAppSelector((state) => state.resetPassword.suggested_password);
  const dispatch = useAppDispatch();
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);
  const email_code = useAppSelector((state) => state.resetPassword.email_code);
  const phone_code = useAppSelector((state) => state.resetPassword.phone.phone_code);
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const [renderSuggested, setRenderSuggested] = useState(true);

  useEffect(() => {
    dispatch(resetPasswordSlice.actions.useSuggestedPassword(renderSuggested));
  }, [renderSuggested, suggested]);

  function goBack() {
    if (extra_security && Object.values(extra_security).length) {
      resetPasswordContext.resetPasswordService.send({ type: "START_EXTRA_SECURITY" });
    } else resetPasswordContext.resetPasswordService.send({ type: "GO_BACK" });

    // initialization of state
    dispatch(resetPasswordSlice.actions.resetState());
  }

  async function submitNewPassword(values: NewPasswordFormData) {
    const newPassword = renderSuggested ? values.suggested : values.custom;

    if (!newPassword || !email_code) {
      return;
    }

    dispatch(resetPasswordSlice.actions.storeNewPassword(newPassword));
    if (!selected_option || selected_option === "without") {
      const response = await dispatch(postSetNewPassword({ email_code: email_code, password: newPassword }));
      if (postSetNewPassword.fulfilled.match(response)) {
        resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
      }
    } else if (selected_option === "phoneCode" && phone_code) {
      const response = await dispatch(
        postSetNewPasswordExtraSecurityPhone({ phone_code: phone_code, email_code: email_code, password: newPassword })
      );
      if (postSetNewPasswordExtraSecurityPhone.fulfilled.match(response)) {
        resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
      }
    } else if (selected_option === "securityKey" && webauthn_assertion) {
      const response = await dispatch(
        postSetNewPasswordExtraSecurityToken({
          webauthn_assertion: webauthn_assertion,
          email_code: email_code,
          password: newPassword,
        })
      );
      if (postSetNewPasswordExtraSecurityToken.fulfilled.match(response)) {
        resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
      }
    } else if (selected_option === "swedishEID") {
      const response = await dispatch(
        postSetNewPasswordExternalMfa({
          email_code: email_code,
          password: newPassword,
        })
      );
      if (postSetNewPasswordExternalMfa.fulfilled.match(response)) {
        resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
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
              <ChangePasswordSuggestedForm {...child_props} handleCancel={goBack} suggestedPassword={suggested} />
            ) : (
              <ChangePasswordCustomForm {...child_props} handleCancel={goBack} handleSubmit={submitNewPassword} />
            )}
          </Splash>
        );
      }}
    />
  );
}

export function ResetPasswordSuccess(): JSX.Element {
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
        <EduIDButton id="reset-password-finished" buttonstyle="link" className="normal-case" type="submit">
          <FormattedMessage defaultMessage="Go to eduid to login" description="go to eduID link text" />
        </EduIDButton>
      </div>
    </form>
  );
}

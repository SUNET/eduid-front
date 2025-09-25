import { loginApi } from "apis/eduidLogin";
import PasswordInput from "components/Common/PasswordInput";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import loginSlice from "slices/Login";
import { clearNotifications } from "slices/Notifications";
import { LoginAtServiceInfo } from "./LoginAtServiceInfo";
import { securityZoneAction, SecurityZoneInfo } from "./SecurityZoneInfo";
import { UsernamePwSubmitButton } from "./UsernamePw";

interface PasswordFormData {
  currentPassword?: string;
}

export function MultiFactorPassword(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const service_info = useAppSelector((state) => state.login.service_info);
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const ref = useAppSelector((state) => state.login.ref);
  const [fetchUsernamePassword] = loginApi.useLazyFetchUsernamePasswordQuery();

  async function handleSubmitUsernamePw(values: PasswordFormData) {
    const errors: PasswordFormData = {};
    const required = "required";

    if (ref && values.currentPassword) {
      /* Send username and password to backend for authentication. If the response is successful,
       * trigger a call to the /next endpoint to get the next step in the login process.
       */
      const response = await fetchUsernamePassword({ ref, password: values.currentPassword });
      if (response.isSuccess) {
        if (response.data.payload.finished) {
          dispatch(loginSlice.actions.callLoginNext());
          dispatch(clearNotifications());
        }
      }
      return;
    }
    if (!values.currentPassword) {
      errors.currentPassword = required;
    }
    return errors;
  }

  return (
    <section className="intro">
      <h1>
        {securityZoneAction ? (
          <FormattedMessage defaultMessage="Security Check: Password" description="Security zone Password heading" />
        ) : (
          <FormattedMessage
            defaultMessage="Welcome, {username}!"
            description="start main title"
            values={{
              username: <strong>{authn_options.display_name}</strong>,
            }}
          />
        )}
      </h1>
      <div className="lead">
        <LoginAtServiceInfo service_info={service_info} />
      </div>
      <SecurityZoneInfo />
      <p>
        <FormattedMessage
          defaultMessage="For security, please enter your password again to complete the login process."
          description="lead text final step enter password"
        />
      </p>

      <section className="username-pw">
        <FinalForm<PasswordFormData>
          aria-label="login form"
          onSubmit={handleSubmitUsernamePw}
          render={(formProps: FormRenderProps<PasswordFormData>) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                <PasswordInput name="currentPassword" autoComplete="current-password" />
                <div className="flex-between">
                  <div className="buttons">
                    <UsernamePwSubmitButton {...formProps} />
                  </div>
                </div>
              </form>
            );
          }}
        ></FinalForm>
      </section>
    </section>
  );
}

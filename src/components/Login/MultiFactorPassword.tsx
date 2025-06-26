import { loginApi } from "apis/login";
import EduIDButton from "components/Common/EduIDButton";
import PasswordInput from "components/Common/PasswordInput";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import loginSlice from "slices/Login";
import { clearNotifications } from "slices/Notifications";
import { LoginAtServiceInfo } from "./LoginAtServiceInfo";

interface PasswordFormData {
  currentPassword?: string;
}

function PasswordSubmitButton(props: FormRenderProps<PasswordFormData>): JSX.Element {
  const loading = useAppSelector((state) => state.app.loading_data);
  /* Disable the button when:
   *   - the app is loading data
   *   - there is a form validation error
   *   - the last submit resulted in a submitError, and no changes have been made since
   */
  const _pwValues = Boolean(props.values["currentPassword"]);
  const _submitError = Boolean(props.submitError && !props.dirtySinceLastSubmit);
  const hasErrors = props.hasValidationErrors ?? true;
  const hasSubmitError = _submitError ?? true;
  const isLoading = loading ?? true;
  const _disabled = Boolean(hasErrors || !_pwValues || hasSubmitError || isLoading);

  return (
    <EduIDButton
      buttonstyle="primary"
      type="submit"
      aria-disabled={_disabled}
      id="login-form-button"
      onClick={props.handleSubmit}
    >
      <FormattedMessage defaultMessage="Log in" description="Login front page" />
    </EduIDButton>
  );
}

export function MultiFactorPassword(): JSX.Element {
  const dispatch = useAppDispatch();
  const service_info = useAppSelector((state) => state.login.service_info);
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const ref = useAppSelector((state) => state.login.ref);
  const [ fetchUsernamePassword_trigger ] = loginApi.useLazyFetchUsernamePasswordQuery();

  async function handleSubmitUsernamePw(values: PasswordFormData) {
    const errors: PasswordFormData = {};
    const required = "required";

    if (ref && values.currentPassword) {
      /* Send username and password to backend for authentication. If the response is successful,
       * trigger a call to the /next endpoint to get the next step in the login process.
       */
      const response = await fetchUsernamePassword_trigger({ ref, password: values.currentPassword });
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
        <FormattedMessage
          defaultMessage="Welcome, {username}!"
          description="start main title"
          values={{
            username: <strong>{authn_options.display_name}</strong>,
          }}
        />
      </h1>
      <div className="lead">
        <LoginAtServiceInfo service_info={service_info} />
        <p>
          <FormattedMessage
            defaultMessage="For security, please enter your password again to complete the login process."
            description="lead text final step enter password"
          />
        </p>
      </div>
      <section className="username-pw">
        <FinalForm<PasswordFormData>
          id="login-form"
          aria-label="login form"
          onSubmit={handleSubmitUsernamePw}
          render={(formProps: FormRenderProps<PasswordFormData>) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                <PasswordInput name="currentPassword" autoComplete="current-password" />
                <div className="flex-between">
                  <div className="buttons">
                    <PasswordSubmitButton {...formProps} />
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

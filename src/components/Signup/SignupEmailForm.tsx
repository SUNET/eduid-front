import { loginApi } from "apis/eduidLogin";
import { signupApi } from "apis/eduidSignup";
import CustomInput from "components/Common/CustomInput";
import EduIDButton from "components/Common/EduIDButton";
import EmailInput from "components/Common/EmailInput";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { validateSignupUserInForm } from "helperFunctions/validation/validateEmail";
import { useEffect } from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { signupSlice } from "slices/Signup";
import { ServiceInfo } from "./SignupEntry";
import { SignupStepIndicator } from "./SignupStepIndicator";

export function SignupEmailForm(): React.JSX.Element {
  return (
    <div className="step-container">
      <section className="intro">
        <h1>
          <FormattedMessage defaultMessage="Create eduID: Enter your personal information" description="Signup" />
        </h1>
        <ServiceInfo />
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage={`Make sure to use an email address you have access to, as it will need to be confirmed by a received code. `}
              description="Signup email form text"
            />
          </p>
        </div>
      </section>
      <EmailForm />
      <SignupStepIndicator currentStep={1} />
    </div>
  );
}

export interface SignupEmailFormData extends Record<string, string | undefined> {
  email?: string;
  given_name?: string;
  surname?: string;
}

/* FORM */
export function EmailForm() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.signup.state);
  const intl = useIntl();
  const [fetchLogout] = loginApi.useLazyFetchLogoutQuery();

  if (!state) return null;

  const givenName = state?.external_mfa?.given_name ?? state?.name?.given_name ?? "";
  const surname = state?.external_mfa?.surname ?? state?.name?.surname ?? "";

  const firstNamePlaceholder = intl.formatMessage({
    id: "placeholder.firstName",
    defaultMessage: "first name",
    description: "placeholder First name",
  });

  const lastNamePlaceholder = intl.formatMessage({
    id: "placeholder.lastName",
    defaultMessage: "last name",
    description: "placeholder Last name",
  });

  async function submitEmailForm(values: SignupEmailFormData) {
    const errors: SignupEmailFormData = {};

    if (values) {
      const signupUser = {
        email: values.email ?? "",
        given_name: values.given_name?.replace(/^\w/, (c) => c.toUpperCase()) ?? "",
        surname: values.surname?.replace(/^\w/, (c) => c.toUpperCase()) ?? "",
      };
      dispatch(signupSlice.actions.setEmail(signupUser));

      // We ask for the e-mail address first, but we don't pass it to the backend until the user has accepted the ToU
      // terms of use, and solved a captcha. So we store it in the redux state here.
      if (
        (state?.captcha.completed && state?.tou.completed) ||
        (state?.external_mfa?.completed && state?.tou.completed)
      ) {
        // Go to RegisterEmail
        dispatch(signupSlice.actions.setNextPage("REGISTER_EMAIL"));
      } else if (state?.external_mfa?.completed) {
        // External MFA already done, skip captcha and go to ToU
        dispatch(clearNotifications());
        dispatch(signupSlice.actions.setNextPage("SIGNUP_TOU"));
      } else {
        dispatch(clearNotifications());
        dispatch(signupSlice.actions.setNextPage("SIGNUP_CAPTCHA"));
      }
    } else {
      errors.email = "required";
    }

    return errors;
  }
  return (
    <FinalForm<SignupEmailFormData>
      onSubmit={submitEmailForm}
      validate={validateSignupUserInForm}
      initialValues={{
        email: "",
        given_name: givenName.replace(/^\w/, (c) => c.toUpperCase()) ?? "",
        surname: surname?.replace(/^\w/, (c) => c.toUpperCase()) ?? "",
      }}
      render={(formProps: FormRenderProps<SignupEmailFormData>) => {
        const _submitError = Boolean(formProps.submitError && !formProps.dirtySinceLastSubmit);
        const _disabled = Boolean(formProps.hasValidationErrors || _submitError || formProps.pristine);

        return (
          <form id="register-form" onSubmit={formProps.handleSubmit}>
            <div className="input-pair">
              <FinalField
                component={CustomInput}
                type="text"
                name="given_name"
                autoFocus={!state?.external_mfa?.given_name}
                required={true}
                placeholder={firstNamePlaceholder}
                label={<FormattedMessage defaultMessage="First name" description="signup first name" />}
                readOnly={!!state?.external_mfa?.given_name}
              />
              <FinalField
                component={CustomInput}
                type="text"
                name="surname"
                required={true}
                placeholder={lastNamePlaceholder}
                label={<FormattedMessage defaultMessage="Last name" description="signup last name" />}
                readOnly={!!state?.external_mfa?.surname}
              />
            </div>
            <EmailInput
              name="email"
              required={true}
              autoComplete="username"
              autoFocus={!!state?.external_mfa?.given_name}
            />
            <div className="buttons">
              <EduIDButton
                buttonstyle="primary"
                id="register-button"
                disabled={_disabled}
                type="submit"
                onClick={formProps.handleSubmit}
              >
                <FormattedMessage defaultMessage="Continue" description="Signup button" />
              </EduIDButton>
            </div>
          </form>
        );
      }}
    />
  );
}

/**
 * Send the user-provided email address to the backend.
 */
export function RegisterEmail() {
  const email = useAppSelector((state) => state.signup.email);
  const given_name = useAppSelector((state) => state.signup.given_name);
  const surname = useAppSelector((state) => state.signup.surname);
  const signupUser = { email: email ?? "", given_name: given_name ?? "", surname: surname ?? "" };
  const { isSuccess, isError } = signupApi.useRegisterEmailRequestQuery(signupUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_ENTER_CODE"));
    } else if (isError) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_ENTRY"));
    }
  }, [isSuccess, isError, dispatch]);

  useEffect(() => {
    // If we don't have the email or name in the state, go back to the email form
    if (!email || !given_name || !surname) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_ENTRY"));
    }
  }, [email, given_name, surname, dispatch]);

  // Show a blank screen while we wait for the response from the backend
  return null;
}

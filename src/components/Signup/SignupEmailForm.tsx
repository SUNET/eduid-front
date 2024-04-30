import { registerEmailRequest } from "apis/eduidSignup";
import CustomInput from "components/Common/CustomInput";
import EduIDButton from "components/Common/EduIDButton";
import EmailInput from "components/Common/EmailInput";
import { SignupGlobalStateContext } from "components/Signup/SignupGlobalState";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { validateEmailInForm } from "helperFunctions/validation/validateEmail";
import { Fragment, useContext, useEffect } from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { signupSlice } from "slices/Signup";

export function SignupEmailForm(): JSX.Element {
  return (
    <Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage defaultMessage="Register: Enter the email address" description="Signup" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage={`Once you have created an eduID you will be able to log in and
                             connect it to your identity.`}
              description="Signup"
            />
          </p>
        </div>
      </section>
      <EmailForm />
    </Fragment>
  );
}

interface EmailFormData {
  email?: string;
  given_name?: string;
  surname?: string;
}

/* FORM */
function EmailForm() {
  const dispatch = useAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);
  const intl = useIntl();

  const firstNamePlaceholder = intl.formatMessage({
    id: "placeholder.firstName",
    defaultMessage: "First name",
    description: "placeholder First name",
  });

  const lastNamePlaceholder = intl.formatMessage({
    id: "placeholder.lastName",
    defaultMessage: "Last name",
    description: "placeholder Last name",
  });

  function submitEmailForm(values: EmailFormData) {
    const errors: EmailFormData = {};

    if (values) {
      // We ask for the e-mail address first, but we don't pass it to the backend until the user has accepted the ToU
      // terms of use, and solved a captcha. So we store it in the redux state here.
      dispatch(
        signupSlice.actions.setEmail({
          email: values.email || "",
          given_name: values.given_name || "",
          surname: values.surname || "",
        })
      );
      dispatch(clearNotifications());
      signupContext.signupService.send({ type: "COMPLETE" });
    } else {
      errors.email = "required";
    }

    return errors;
  }
  return (
    <FinalForm<EmailFormData>
      onSubmit={submitEmailForm}
      validate={validateEmailInForm}
      initialValues={{
        email: "",
        given_name: "",
        surname: "",
      }}
      render={(formProps: FormRenderProps<EmailFormData>) => {
        const _submitError = Boolean(formProps.submitError && !formProps.dirtySinceLastSubmit);
        const _disabled = Boolean(formProps.hasValidationErrors || _submitError || formProps.pristine);

        return (
          <form id="register-form" onSubmit={formProps.handleSubmit}>
            <FinalField
              component={CustomInput}
              type="text"
              name="given_name"
              autoFocus={true}
              placeholder={firstNamePlaceholder}
              label={<FormattedMessage defaultMessage="First name" description="signup first name" />}
            />
            <FinalField
              component={CustomInput}
              type="text"
              name="surname"
              placeholder={lastNamePlaceholder}
              label={<FormattedMessage defaultMessage="Last name" description="signup last name" />}
            />
            <EmailInput name="email" required={true} autoComplete="username" />
            <div className="buttons">
              <EduIDButton
                buttonstyle="primary"
                id="register-button"
                disabled={_disabled}
                onClick={formProps.handleSubmit}
              >
                <FormattedMessage defaultMessage="Create eduID" description="Signup button" />
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
  const dispatch = useAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);
  const email = useAppSelector((state) => state.signup.email);
  const given_name = useAppSelector((state) => state.signup.given_name);
  const surname = useAppSelector((state) => state.signup.surname);
  const signupUser = { email: email || "", given_name: given_name || "", surname: surname || "" };

  if (!signupUser) {
    signupContext.signupService.send({ type: "API_FAIL" });
    return null;
  }

  async function registerEmail(signupUser: { email: string; given_name: string; surname: string }) {
    const res = await dispatch(registerEmailRequest(signupUser));

    if (registerEmailRequest.fulfilled.match(res)) {
      signupContext.signupService.send({ type: "API_SUCCESS" });
    } else {
      signupContext.signupService.send({ type: "API_FAIL" });
    }
  }

  useEffect(() => {
    registerEmail(signupUser);
  }, []);

  // Show a blank screen while we wait for the response from the backend
  return null;
}

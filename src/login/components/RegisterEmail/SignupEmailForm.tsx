import { registerEmailRequest } from "apis/eduidSignup";
import EduIDButton from "components/EduIDButton";
import { SignupGlobalStateContext } from "components/Signup/SignupGlobalState";
import { Fragment, useContext, useEffect } from "react";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { signupSlice } from "reducers/Signup";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import EmailInput from "../Inputs/EmailInput";

export function SignupEmailForm(): JSX.Element {
  const dashboard_url = useSignupAppSelector((state) => state.config.dashboard_url);

  const login_here_link = (
    <a href={dashboard_url}>{<FormattedMessage defaultMessage="here" description="Signup login here link" />}</a>
  );

  return (
    <Fragment>
      <h1 className="heading">
        <FormattedMessage defaultMessage="Register your email address to create your eduID." description="Signup" />
      </h1>
      <p>
        <FormattedMessage
          defaultMessage={`Once you have created an eduID you will be able to log in and
                             connect it to your Swedish national identity number.`}
          description="Signup"
        />
      </p>

      <EmailForm />

      <p>
        <FormattedMessage
          defaultMessage="If you already have eduID you can log in {login_here_link}."
          description="Signup instructions"
          values={{ login_here_link }}
        />
      </p>
    </Fragment>
  );
}

interface EmailFormData {
  email?: string;
}

/* FORM */
function EmailForm() {
  const dispatch = useSignupAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);

  function submitEmailForm(values: EmailFormData) {
    const errors: EmailFormData = {};

    if (values.email) {
      // We ask for the e-mail address first, but we don't pass it to the backend until the user has accepted the ToU
      // terms of use, and solved a captcha. So we store it in the redux state here.
      dispatch(signupSlice.actions.setEmail(values.email));
      signupContext.signupService.send({ type: "COMPLETE" });
    } else {
      errors.email = "required";
    }

    return errors;
  }
  return (
    <FinalForm<EmailFormData>
      onSubmit={submitEmailForm}
      initialValues={{
        email: "",
      }}
      render={(formProps: FormRenderProps<EmailFormData>) => {
        const _submitError = Boolean(formProps.submitError && !formProps.dirtySinceLastSubmit);
        const _disabled = Boolean(formProps.hasValidationErrors || _submitError || formProps.pristine);

        return (
          <form id="register-form" onSubmit={formProps.handleSubmit}>
            <fieldset>
              <EmailInput name="email" autoFocus={true} required={true} autoComplete="username" />

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
            </fieldset>
          </form>
        );
      }}
    />
  );
}

export function RegisterEmail() {
  const dispatch = useSignupAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);
  const email = useSignupAppSelector((state) => state.signup.email);

  if (!email) {
    signupContext.signupService.send({ type: "API_FAIL" });
    return null;
  }

  async function registerEmail(email: string) {
    const res = await dispatch(registerEmailRequest({ email }));

    if (registerEmailRequest.fulfilled.match(res)) {
      signupContext.signupService.send({ type: "API_SUCCESS" });
    } else {
      signupContext.signupService.send({ type: "API_FAIL" });
    }
  }

  useEffect(() => {
    registerEmail(email);
  }, []);

  // Show a blank screen while we wait for the response from the backend
  return null;
}

import EduIDButton from "components/EduIDButton";
import { SignupGlobalStateContext } from "components/Signup/SignupGlobalState";
import { Fragment, useContext } from "react";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { signupSlice } from "reducers/Signup";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import EmailInput from "../Inputs/EmailInput";

export default function SignupEmailForm(): JSX.Element {
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
      dispatch(signupSlice.actions.setEmail(values.email));
      signupContext.signupService.send({ type: "EMAIL_COMPLETE" });
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

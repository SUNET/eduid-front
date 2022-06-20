import { fetchTryCaptcha } from "apis/eduidSignup";
import AccountCreated from "components/AccountCreated";
import Captcha from "components/Captcha";
import EduIDButton from "components/EduIDButton";
import EmailInUse from "components/EmailInUse";
import { ToUs } from "login/app_utils/helperFunctions/ToUs";
import React, { Fragment } from "react";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "reducers/Notifications";
import { signupSlice } from "reducers/Signup";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import EmailInput from "../Inputs/EmailInput";
import NotificationModal from "../Modals/NotificationModal";

/* Handle user entering an e-mail address, and accepting the ToU which is shown in a modal, and then solving a captcha.
 * When the user has completed all of those steps, the email address and captcha response is sent to the backend. If
 * the backend can confirm the captcha response, it will create the user and send back a new current_step, which we
 * put into the signup state and which will cause SignupMain to take the user somewhere else than here.
 */
export function RegisterEmail(): JSX.Element | null {
  const email = useSignupAppSelector((state) => state.signup.email);
  const tou_accepted = useSignupAppSelector((state) => state.signup.tou_accepted);
  const current_step = useSignupAppSelector((state) => state.signup.current_step);
  const dispatch = useSignupAppDispatch();

  function handleCaptchaCancel() {
    dispatch(signupSlice.actions.setEmail(undefined));
  }

  function handleCaptchaCompleted(recaptcha_response: string) {
    if (recaptcha_response && email && tou_accepted) {
      dispatch(fetchTryCaptcha({ email, tou_accepted, recaptcha_response }));
    }
  }

  if (current_step === "register") {
    if (!email || !tou_accepted) {
      return <EmailFormAndToU />;
    }

    return <Captcha handleCaptchaCancel={handleCaptchaCancel} handleCaptchaCompleted={handleCaptchaCompleted} />;
  }

  if (current_step === "new") {
    // Tentative account created in the Signup backend, and an e-mail was sent to the user.
    return <AccountCreated />;
  }

  if (current_step === "address-used") {
    return <EmailInUse />;
  }

  // TODO: Shouldn't ever get here, but some kind of error message?
  return null;
}

export function EmailFormAndToU(): JSX.Element {
  const dashboard_url = useSignupAppSelector((state) => state.config.dashboard_url);
  const email = useSignupAppSelector((state) => state.signup.email);
  const tou_accepted = useSignupAppSelector((state) => state.signup.tou_accepted);
  const dispatch = useSignupAppDispatch();

  function handleAccept(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(signupSlice.actions.setToUAccepted(true));
    dispatch(clearNotifications());
  }

  function handleReject(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(signupSlice.actions.setEmail(undefined));
    dispatch(signupSlice.actions.setToUAccepted(false));
  }

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
      <NotificationModal
        id="register-modal"
        title={<FormattedMessage defaultMessage="General rules for eduID users" description="tou.header" />}
        mainText={ToUs["2016-v1"]}
        showModal={Boolean(email && !tou_accepted)}
        closeModal={handleReject}
        acceptModal={handleAccept}
        acceptButtonText={<FormattedMessage defaultMessage="Accept" description="accept button" />}
      />
    </Fragment>
  );
}

interface EmailFormData {
  email?: string;
}

/* FORM */
function EmailForm() {
  const dispatch = useSignupAppDispatch();

  function submitEmailForm(values: EmailFormData) {
    const errors: EmailFormData = {};

    if (values.email) {
      //dispatch(actions.addEmail(values.email));
      dispatch(signupSlice.actions.setEmail(values.email));
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

export default RegisterEmail;

import { fetchTryCaptcha } from "apis/eduidSignup";
import Captcha from "components/Captcha";
import EduIDButton from "components/EduIDButton";
import { ToUs } from "login/app_utils/helperFunctions/ToUs";
import React, { Fragment } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router";
import { clearNotifications } from "reducers/Notifications";
import { signupSlice } from "reducers/Signup";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import { validateEmailField } from "../../app_utils/validation/validateEmail";
import CustomInput from "../Inputs/CustomInput";
import NotificationModal from "../Modals/NotificationModal";

/* Handle user entering an e-mail address, and accepting the ToU which is shown in a modal, and then solving a captcha.
 * When the user has completed all of those steps, the email address and captcha response is sent to the backend. If
 * the backend can confirm the captcha response, it will create the user and send back a new current_step, which we
 * put into the signup state and which will cause SignupMain to take the user somewhere else than here.
 */
export function RegisterEmail(): JSX.Element | null {
  const dashboard_url = useSignupAppSelector((state) => state.config.dashboard_url);
  const email = useSignupAppSelector((state) => state.signup.email);
  const tou_accepted = useSignupAppSelector((state) => state.signup.tou_accepted);
  const dispatch = useSignupAppDispatch();
  const history = useHistory();

  function handleCaptchaCancel() {
    dispatch(signupSlice.actions.setEmail(undefined));
  }

  function handleCaptchaCompleted(recaptcha_response: string) {
    async function callTryCaptcha(args: { email: string; tou_accepted: boolean; recaptcha_response: string }) {
      const resp = await dispatch(fetchTryCaptcha(args));
      if (fetchTryCaptcha.fulfilled.match(resp)) {
        // TODO: re-work SignupMain to not use Route, but instead see that state.signup.current_step has been updated
        history.push(resp.payload.next);
      }
    }

    if (recaptcha_response && email && tou_accepted) {
      callTryCaptcha({ email, tou_accepted, recaptcha_response });
    }
  }

  if (!email || !tou_accepted) {
    return <EmailFormAndToU />;
  }

  return <Captcha handleCaptchaCancel={handleCaptchaCancel} handleCaptchaCompleted={handleCaptchaCompleted} />;
}

export function EmailFormAndToU(): JSX.Element {
  const dashboard_url = useSignupAppSelector((state) => state.config.dashboard_url);
  const email = useSignupAppSelector((state) => state.signup.email);
  const tou_accepted = useSignupAppSelector((state) => state.signup.tou_accepted);
  const dispatch = useSignupAppDispatch();
  //const history = useHistory();

  function handleAccept(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(signupSlice.actions.setToUAccepted(true));
    //history.push(SIGNUP_BASE_PATH + "/trycaptcha");
    // remove any remaining notification messages
    dispatch(clearNotifications());
    // to make captcha button active
    //dispatch(makeCaptchaButtonAvailable());
  }

  function handleReject(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(signupSlice.actions.setEmail(undefined));
    dispatch(signupSlice.actions.setToUAccepted(false));
    //dispatch(actions.rejectTOU());
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

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.email",
    defaultMessage: "name@example.com",
    description: "placeholder text for email input",
  });

  function submitEmailForm(values: EmailFormData) {
    if (values.email) {
      //dispatch(actions.addEmail(values.email));
      dispatch(signupSlice.actions.setEmail(values.email));
    }
  }

  return (
    <FinalForm<EmailFormData>
      onSubmit={submitEmailForm}
      initialValues={{
        email: "",
      }}
      render={({ handleSubmit, pristine, invalid }) => {
        return (
          <form id="register-form" onSubmit={handleSubmit}>
            <fieldset>
              <FinalField
                label={<FormattedMessage defaultMessage="Email address" />}
                component={CustomInput}
                componentClass="input"
                type="text"
                name="email"
                placeholder={placeholder}
                validate={validateEmailField}
                autoFocus
              />
              <div className="buttons">
                <EduIDButton
                  buttonstyle="primary"
                  id="register-button"
                  disabled={invalid || pristine}
                  onClick={handleSubmit}
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

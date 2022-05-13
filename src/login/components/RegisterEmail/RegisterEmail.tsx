import { makeCaptchaButtonAvailable } from "actions/Captcha";
import * as actions from "actions/Email";
import EduIDButton from "components/EduIDButton";
import { SIGNUP_BASE_PATH } from "globals";
import { ToUs } from "login/app_utils/helperFunctions/ToUs";
import { translate } from "login/translation";
import React, { Fragment } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router";
import { clearNotifications } from "reducers/Notifications";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import { validateEmailField } from "../../app_utils/validation/validateEmail";
import CustomInput from "../Inputs/CustomInput";
import NotificationModal from "../Modals/NotificationModal";

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
      dispatch(actions.addEmail(values.email));
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

export function RegisterEmail(): JSX.Element {
  const dashboard_url = useSignupAppSelector((state) => state.config.dashboard_url);
  const acceptingTOU = useSignupAppSelector((state) => state.email.acceptingTOU);
  const dispatch = useSignupAppDispatch();
  const history = useHistory();

  function handleAccept(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(actions.acceptTOU());
    history.push(SIGNUP_BASE_PATH + "/trycaptcha");
    // remove any remaining notification messages
    dispatch(clearNotifications());
    // to make captcha button active
    dispatch(makeCaptchaButtonAvailable());
  }

  function handleReject(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(actions.rejectTOU());
  }

  return (
    <Fragment>
      <div key="0" id="content" className="horizontal-content-margin content">
        <h1 className="heading">{translate("register.sub-heading")}</h1>
        <p>{translate("register.paragraph")}</p>

        <EmailForm />
        <p>
          {translate("register.toLogin")}&nbsp;
          <a href={dashboard_url}>{translate("text.link")}</a>
        </p>
      </div>
      <div key="1">
        <NotificationModal
          id="register-modal"
          title={<FormattedMessage defaultMessage="General rules for eduID users" description="tou.header" />}
          mainText={ToUs["2016-v1"]}
          showModal={acceptingTOU}
          closeModal={handleReject}
          acceptModal={handleAccept}
          acceptButtonText={<FormattedMessage defaultMessage="accept" description="accept button" />}
        />
      </div>
    </Fragment>
  );
}

export default RegisterEmail;

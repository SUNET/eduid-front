import { translate } from "login/translation";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { longCodePattern } from "../login/app_utils/validation/regexPatterns";
import { validateEmailInForm } from "../login/app_utils/validation/validateEmail";
import DataTable from "../login/components/DataTable/DataTable";
import CustomInput from "../login/components/Inputs/CustomInput";
import ConfirmModal from "../login/components/Modals/ConfirmModalContainer";
import "../login/styles/index.scss";
import EduIDButton from "./EduIDButton";
import { clearNotifications } from "reducers/Notifications";
import emailsSlice from "reducers/Emails";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import {
  requestRemoveEmail,
  postNewEmail,
  requestResendEmailCode,
  requestVerifyEmail,
  requestMakePrimaryEmail,
} from "apis/addEmails";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import { FORM_ERROR } from "final-form";

interface EmailFormData {
  email?: string;
}

function Emails() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const dispatch = useDashboardAppDispatch();
  const emails = useDashboardAppSelector((state) => state.emails);
  const confirming = useDashboardAppSelector((state) => state.emails.confirming);

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const emailPlaceholder = intl.formatMessage({
    id: "placeholder.email",
    defaultMessage: "name@example.com",
    description: "placeholder text for email input",
  });

  const modalPlaceholder = intl.formatMessage({
    id: "emails.confirm_email_placeholder",
    defaultMessage: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    description: "Placeholder for email code input",
  });

  const title = intl.formatMessage(
    {
      id: "emails.confirm_title",
      defaultMessage: "Click the link or enter the code sent to {email} here",
      description: "Title for email code input",
    },
    { email: confirming }
  );

  async function handleAdd(values: EmailFormData) {
    const singleEmail = emails.emails;
    const duplicatedEmail =
      singleEmail && Object.values(singleEmail).filter((email, _index) => email.email === values.email);

    if (values.email) {
      const response = await dispatch(postNewEmail({ email: values.email }));
      if (postNewEmail.fulfilled.match(response)) {
        return setShowEmailForm(false);
      } else if (values.email === (duplicatedEmail !== undefined && duplicatedEmail[0].email)) {
        return {
          [FORM_ERROR]: (
            <FormattedMessage
              defaultMessage="That email address is already in use, please choose another"
              description="Duplicate email"
            />
          ),
        };
      }
    } else setShowEmailForm(true);
  }

  function handleCancel() {
    setShowEmailForm(false);
  }

  function handleRemove(event: React.MouseEvent<HTMLElement>) {
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.email-row");
    const email = dataNode && dataNode.getAttribute("data-object");
    if (email) {
      dispatch(requestRemoveEmail({ email: email }));
    }
  }

  function handleEmailForm() {
    setShowEmailForm(true);
    // rendering focus on input, setTimeout for 2 milliseconds to recognize the form
    setTimeout(() => {
      (document.getElementById("email") as HTMLInputElement).focus();
    }, 200);
  }

  function handleResend(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    dispatch(requestResendEmailCode());
  }

  function handleStartConfirmation(event: React.MouseEvent<HTMLElement>) {
    dispatch(clearNotifications());
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.email-row"),
      email = dataNode && dataNode.getAttribute("data-object");
    if (email) dispatch(emailsSlice.actions.startConfirmationEmail({ email: email }));
  }

  function handleStopConfirmation() {
    dispatch(emailsSlice.actions.stopConfirmation());
  }

  function handleConfirm() {
    const codeValue = document.getElementById("confirmation-code-area");
    const data = {
      code: codeValue && (codeValue.querySelector("input") as HTMLInputElement).value.trim(),
    };
    if (data.code) dispatch(requestVerifyEmail({ code: data.code }));
    dispatch(emailsSlice.actions.stopConfirmation());
  }

  function handleMakePrimary(event: React.MouseEvent<HTMLElement>) {
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.email-row"),
      data = {
        email: dataNode && dataNode.getAttribute("data-object"),
      };
    if (data.email) dispatch(requestMakePrimaryEmail({ email: data.email }));
  }

  return (
    <article className="emails-view-form-container">
      <div className="intro">
        <h3>
          <FormattedMessage defaultMessage="Email addresses" description="Emails main title" />
        </h3>
        <p>
          <FormattedMessage
            defaultMessage="You can connect one or more email addresses with your eduID account and select one to be 
            your primary email address."
            description="Emails description"
          />
        </p>
      </div>
      <div id="email-display">
        <DataTable
          data={emails.emails}
          handleStartConfirmation={handleStartConfirmation}
          handleRemove={handleRemove}
          handleMakePrimary={handleMakePrimary}
        />
        {showEmailForm ? (
          <FinalForm<EmailFormData>
            onSubmit={handleAdd}
            initialValues={{
              email: "",
            }}
            validate={validateEmailInForm}
            render={({ submitError, handleSubmit, submitting, pristine, invalid, valid, values }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <FinalField
                    label={translate("profile.email_display_title")}
                    component={CustomInput}
                    componentClass="input"
                    type="text"
                    name="email"
                    submitError={submitError}
                    placeholder={emailPlaceholder}
                    helpBlock={
                      <FormattedMessage defaultMessage="A valid email address" description="Emails input help text" />
                    }
                  />
                  {submitError && (
                    <span role="alert" aria-invalid="true" tabIndex={0} className="input-validate-error">
                      {submitError}
                    </span>
                  )}
                  <div className="flex-buttons">
                    <EduIDButton
                      id="email-button"
                      buttonstyle="primary"
                      disabled={invalid || pristine}
                      onClick={handleSubmit}
                    >
                      <FormattedMessage defaultMessage="Add" description="Emails button add" />
                    </EduIDButton>
                    <EduIDButton id="email-button" buttonstyle="secondary" onClick={handleCancel}>
                      <FormattedMessage defaultMessage="Cancel" description="Emails button cancel" />
                    </EduIDButton>
                  </div>
                </form>
              );
            }}
          />
        ) : (
          <EduIDButton id="add-more-button" buttonstyle="link" className=" lowercase" onClick={handleEmailForm}>
            <FormattedMessage defaultMessage="+ add more" description="Emails button add more" />
          </EduIDButton>
        )}
      </div>
      <ConfirmModal
        modalId="emailConfirmDialog"
        id="emailConfirmDialogControl"
        title={title}
        resendLabel={translate("cm.enter_code")}
        resendHelp={translate("cm.lost_code")}
        resendText={translate("cm.resend_code")}
        placeholder={modalPlaceholder}
        showModal={Boolean(confirming)}
        closeModal={handleStopConfirmation}
        handleResend={handleResend}
        handleConfirm={handleConfirm}
        helpBlock={translate("emails.confirm_help_text")}
        validationPattern={longCodePattern}
        validationError={"confirmation.code_invalid_format"}
      />
    </article>
  );
}

export default Emails;

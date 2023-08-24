import {
  postNewEmail,
  requestMakePrimaryEmail,
  requestRemoveEmail,
  requestResendEmailCode,
  requestVerifyEmail,
} from "apis/eduidEmail";
import ConfirmModal from "components/Common/ConfirmModal";
import CustomInput from "components/Common/CustomInput";
import EduIDButton from "components/Common/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useState } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { longCodePattern } from "../../helperFunctions/validation/regexPatterns";
import { validateEmailField } from "../../helperFunctions/validation/validateEmail";
import DataTable from "./DataTable";

interface EmailFormData {
  email?: string;
}

function Emails() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | undefined>();
  const dispatch = useDashboardAppDispatch();
  const emails = useDashboardAppSelector((state) => state.emails);

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.email",
    defaultMessage: "name@example.com",
    description: "placeholder text for email input",
  });

  const modalPlaceholder = intl.formatMessage({
    id: "emails.confirm_email_placeholder",
    defaultMessage: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    description: "Placeholder for email code input",
  });

  async function handleAdd(values: EmailFormData) {
    if (values.email) {
      const response = await dispatch(postNewEmail({ email: values.email }));
      if (postNewEmail.fulfilled.match(response)) {
        // email form closed when user have successfully added an email
        return setShowEmailForm(false);
      }
    } else setShowEmailForm(true);
  }

  function handleCancel() {
    setShowEmailForm(false);
  }

  function handleRemove(event: React.MouseEvent<HTMLElement>) {
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.email");
    const email = dataNode?.getAttribute("data-object");
    if (email) {
      dispatch(requestRemoveEmail({ email: email }));
    }
  }

  function handleEmailForm() {
    setShowEmailForm(true);
  }

  function handleResend(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    if (selectedEmail) dispatch(requestResendEmailCode({ email: selectedEmail }));
  }

  function handleStartConfirmation(event: React.MouseEvent<HTMLElement>) {
    dispatch(clearNotifications());
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.email");
    const email = dataNode?.getAttribute("data-object");
    if (email) setSelectedEmail(email);
  }

  function handleStopConfirmation() {
    setSelectedEmail(undefined);
  }

  function handleConfirm(values: { [key: string]: string }) {
    const confirmationCode = values["email-confirm-modal"];
    if (confirmationCode && selectedEmail)
      dispatch(requestVerifyEmail({ code: confirmationCode.trim(), email: selectedEmail }));
    setSelectedEmail(undefined);
  }

  function handleMakePrimary(event: React.MouseEvent<HTMLElement>) {
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.email");
    const email = dataNode?.getAttribute("data-object");
    if (email) dispatch(requestMakePrimaryEmail({ email: email }));
  }

  function validateEmailsInForm(value: string): string | undefined {
    if (!value) {
      return "required";
    }
    /* Check if the value (new email-address) is already present in the list of the users' e-mail addresses */
    const is_duplicate = emails.emails.find((x) => x.email === value);
    if (is_duplicate) {
      return "emails.duplicated";
    }
    return validateEmailField(value);
  }

  return (
    <article className="emails-view-form-container">
      <h2>
        <FormattedMessage defaultMessage="Email addresses" description="Emails main title" />
      </h2>
      <p>
        <FormattedMessage
          defaultMessage={`You can connect one or more email addresses with your eduID account and select one to be
            your primary email address.`}
          description="Add emails description"
        />
      </p>
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
            render={({ handleSubmit, pristine, invalid }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <FinalField
                    label={
                      <FormattedMessage defaultMessage="Email address" description="profile email display title" />
                    }
                    component={CustomInput}
                    componentClass="input"
                    type="text"
                    name="email"
                    placeholder={placeholder}
                    validate={validateEmailsInForm}
                    autoFocus
                  />
                  <div className="buttons">
                    <EduIDButton id="cancel-adding-email" buttonstyle="secondary" onClick={handleCancel}>
                      <FormattedMessage defaultMessage="Cancel" description="Emails button cancel" />
                    </EduIDButton>
                    <EduIDButton
                      type="submit"
                      id="add-email"
                      buttonstyle="primary"
                      disabled={invalid || pristine}
                      onClick={handleSubmit}
                    >
                      <FormattedMessage defaultMessage="Add" description="Emails button add" />
                    </EduIDButton>
                  </div>
                </form>
              );
            }}
          />
        ) : (
          <EduIDButton id="emails-add-more-button" buttonstyle="link" className=" lowercase" onClick={handleEmailForm}>
            <FormattedMessage defaultMessage="+ add more" description="button add more" />
          </EduIDButton>
        )}
      </div>
      <ConfirmModal
        id="email-confirm-modal"
        title={
          <FormattedMessage
            defaultMessage={`Click the link or enter the code sent to {email} here`}
            description="Title for email code input"
            values={{ email: selectedEmail }}
          />
        }
        placeholder={modalPlaceholder}
        showModal={Boolean(selectedEmail)}
        closeModal={handleStopConfirmation}
        handleConfirm={handleConfirm}
        modalFormLabel={<FormattedMessage description="emails enter code" defaultMessage={`Code`} />}
        validationError="confirmation.code_invalid_format"
        validationPattern={longCodePattern}
        helpBlock={
          <FormattedMessage
            description="Help text for email code"
            defaultMessage={`The code is formatted as five groups of characters and numbers, separated by hyphens`}
          />
        }
        resendMarkup={
          <div className="resend-code-container">
            <a href="#" onClick={handleResend}>
              <FormattedMessage description="resend code" defaultMessage={`Send a new code`} />
            </a>
          </div>
        }
      />
    </article>
  );
}

export default Emails;

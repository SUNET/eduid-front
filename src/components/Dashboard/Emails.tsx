import { emailApi } from "apis/eduidEmail";
import ConfirmModal from "components/Common/ConfirmModal";
import CustomInput from "components/Common/CustomInput";
import EduIDButton from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import React, { useState } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { shortCodePattern } from "../../helperFunctions/validation/regexPatterns";
import { validateEmailField } from "../../helperFunctions/validation/validateEmail";
import DataTable from "./DataTable";

interface EmailFormData {
  email?: string;
}

function Emails() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | undefined>();
  const emails = useAppSelector((state) => state.emails);
  const [verifyEmail] = emailApi.useLazyVerifyEmailQuery();
  const [resendEmailCode] = emailApi.useLazyResendEmailCodeQuery();
  const [newEmail] = emailApi.useLazyNewEmailQuery();

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "emails.emailPlaceholder",
    defaultMessage: "name@example.com",
    description: "placeholder text for email input",
  });

  const modalPlaceholder = intl.formatMessage({
    id: "common.enterCodePlaceholder",
    defaultMessage: "enter code",
    description: "Placeholder for email code input",
  });

  async function handleAdd(values: EmailFormData) {
    if (values.email) {
      const response = await newEmail({ email: values.email });
      if (response.isSuccess) {
        // email form closed when user have successfully added an email
        return setShowEmailForm(false);
      }
    } else setShowEmailForm(true);
  }

  function handleCancel() {
    setShowEmailForm(false);
  }

  function handleEmailForm() {
    setShowEmailForm(true);
  }

  function handleResend(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    if (selectedEmail) resendEmailCode({ email: selectedEmail });
  }

  function handleStopConfirmation() {
    setSelectedEmail(undefined);
  }

  function handleConfirm(values: { [key: string]: string }) {
    const confirmationCode = values["email-confirm-modal"];
    if (confirmationCode && selectedEmail) verifyEmail({ code: confirmationCode.trim(), email: selectedEmail });
    setSelectedEmail(undefined);
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
    <article id="add-email-addresses">
      <h2>
        <FormattedMessage id="emails.title" defaultMessage="Email addresses" description="Emails main title" />
      </h2>
      <p>
        <FormattedMessage
          id="emails.description"
          defaultMessage={`You can connect one or more email addresses with your eduID account and select one to be
            your primary email address.`}
          description="Add emails description"
        />
      </p>
      <div className="email-display">
        <DataTable data={emails.emails} setSelectedEmail={setSelectedEmail} />
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
                      <FormattedMessage id="common.emailAddress" defaultMessage="Email address" description="profile email display title" />
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
                      <FormattedMessage id="common.cancel" defaultMessage="Cancel" description="button cancel" />
                    </EduIDButton>
                    <EduIDButton
                      type="submit"
                      id="add-email"
                      buttonstyle="primary"
                      disabled={invalid || pristine}
                      onClick={handleSubmit}
                    >
                      <FormattedMessage id="common.add" defaultMessage="Add" description="Emails button add" />
                    </EduIDButton>
                  </div>
                </form>
              );
            }}
          />
        ) : (
          <EduIDButton id="emails-add-more-button" buttonstyle="link normal-case" onClick={handleEmailForm}>
            <FormattedMessage id="emails.addButton" defaultMessage="+ Add more" description="button add more" />
          </EduIDButton>
        )}
      </div>
      <ConfirmModal
        id="email-confirm-modal"
        title={
          <FormattedMessage
            id="emails.emailTitle"
            defaultMessage={`Enter the code sent to {email}`}
            description="Title for email code input"
            values={{ email: selectedEmail }}
          />
        }
        placeholder={modalPlaceholder}
        showModal={Boolean(selectedEmail)}
        closeModal={handleStopConfirmation}
        handleConfirm={handleConfirm}
        modalFormLabel={<FormattedMessage id="common.code" description="emails enter code" defaultMessage={`Code`} />}
        validationError="confirmation.code_invalid_format"
        validationPattern={shortCodePattern}
        resendMarkup={
          <div className="resend-code-container">
            <EduIDButton buttonstyle="link normal-case" onClick={handleResend}>
              <FormattedMessage id="emails.resend" description="resend code" defaultMessage={`Send a new code`} />
            </EduIDButton>
          </div>
        }
      />
    </article>
  );
}

export default Emails;

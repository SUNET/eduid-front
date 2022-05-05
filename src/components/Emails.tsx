import { translate } from "login/translation";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { longCodePattern } from "../login/app_utils/validation/regexPatterns";
import { validateEmailField } from "../login/app_utils/validation/validateEmail";
import DataTable from "../login/components/DataTable/DataTable";
import CustomInput from "../login/components/Inputs/CustomInput";
import ConfirmModal from "../login/components/Modals/ConfirmModalContainer";
import "../login/styles/index.scss";
import EduIDButton from "./EduIDButton";
import { clearNotifications } from "reducers/Notifications";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import {
  requestRemoveEmail,
  postNewEmail,
  requestResendEmailCode,
  requestVerifyEmail,
  requestMakePrimaryEmail,
} from "apis/eduidEmail";
import { Form as FinalForm, Field as FinalField } from "react-final-form";

interface EmailFormData {
  email?: string;
}

function Emails() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [confirmingEmail, setConfirmingEmail] = useState<string | undefined>();
  const dispatch = useDashboardAppDispatch();
  const emails = useDashboardAppSelector((state) => state.emails);

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
    { email: confirmingEmail }
  );

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
    if (confirmingEmail) dispatch(requestResendEmailCode({ email: confirmingEmail }));
  }

  function handleStartConfirmation(event: React.MouseEvent<HTMLElement>) {
    dispatch(clearNotifications());
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.email-row");
    const email = dataNode && dataNode.getAttribute("data-object");
    if (email) setConfirmingEmail(email);
  }

  function handleStopConfirmation() {
    setConfirmingEmail(undefined);
  }

  function handleConfirm() {
    const codeValue = document.getElementById("confirmation-code-area");
    const data = {
      code: codeValue && (codeValue.querySelector("input") as HTMLInputElement).value.trim(),
    };
    if (data.code && confirmingEmail) dispatch(requestVerifyEmail({ code: data.code, email: confirmingEmail }));
    setConfirmingEmail(undefined);
  }

  function handleMakePrimary(event: React.MouseEvent<HTMLElement>) {
    const dataNode = (event.target as HTMLTextAreaElement).closest("tr.email-row"),
      data = {
        email: dataNode && dataNode.getAttribute("data-object"),
      };
    if (data.email) dispatch(requestMakePrimaryEmail({ email: data.email }));
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
      <div className="intro">
        <h3>
          <FormattedMessage defaultMessage="Email addresses" description="Emails main title" />
        </h3>
        <p>
          <FormattedMessage
            defaultMessage={`You can connect one or more email addresses with your eduID account and select one to be 
            your primary email address.`}
            description="Add emails description"
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
                    placeholder={emailPlaceholder}
                    validate={validateEmailsInForm}
                  />
                  <div className="flex-buttons">
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
        showModal={Boolean(confirmingEmail)}
        closeModal={handleStopConfirmation}
        handleResend={handleResend}
        handleConfirm={handleConfirm}
        helpBlock={translate("emails.confirm_help_text")}
        validationPattern={longCodePattern}
        validationError="confirmation.code_invalid_format"
      />
    </article>
  );
}

export default Emails;

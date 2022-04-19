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
import { copyFile } from "fs";

interface EmailFormData {
  email?: string;
}

function Emails(props: any) {
  const [formClass, setFormClass] = useState("hide");
  const [addLinkClass, setAddLinkClass] = useState("btn-link");
  const [duplicatedEmail, setDisabledButton] = useState(false);
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

  function handleChange(event: any) {
    const singleEmail = emails.emails;
    const duplicatedEmail =
      singleEmail && Object.values(singleEmail).filter((email, index) => email.email === event.target.value);
    if (duplicatedEmail?.length) {
      setDisabledButton(true);
    }
  }

  function handleAdd(values: EmailFormData, form: any) {
    console.log("emails", emails);
    if (values.email) dispatch(postNewEmail({ email: values.email }));
    setFormClass("hide");
    setAddLinkClass("show");
    form.reset();
  }

  function handleCancel(form: any) {
    console.log(form);
    form.reset();
    setFormClass("hide");
    setAddLinkClass("show");
  }

  function handleRemove(e: any) {
    const dataNode = e.target.closest("tr.emailrow");
    const email: string = dataNode.getAttribute("data-object");
    dispatch(requestRemoveEmail({ email: email }));
  }

  function showEmailForm() {
    setFormClass("form-content");
    setAddLinkClass("hide");
    // rendering focus on input, setTimeout for 2 milliseconds to recognize the form
    setTimeout(() => {
      (document.getElementById("email") as HTMLInputElement).focus();
    }, 200);
  }

  function handleResend(e: any) {
    e.preventDefault();
    dispatch(requestResendEmailCode());
  }

  function handleStartConfirmation(e: any) {
    dispatch(clearNotifications());
    const dataNode = e.target.closest("tr.emailrow"),
      data = {
        identifier: dataNode.getAttribute("data-identifier"),
        email: dataNode.getAttribute("data-object"),
      };
    dispatch(emailsSlice.actions.startConfirmationEmail(data));
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

  function handleMakePrimary(e: any) {
    const dataNode = e.target.closest("tr.emailrow"),
      data = {
        email: dataNode.getAttribute("data-object"),
      };
    dispatch(requestMakePrimaryEmail({ email: data.email }));
  }

  return (
    <article className="emailsview-form-container">
      <div className="intro">
        <h3>
          <FormattedMessage defaultMessage="Email addresses" description="Emails main title" />
          {/* {translate("emails.main_title")} */}
        </h3>
        <p>
          <FormattedMessage
            defaultMessage="You can connect one or more email addresses with your eduID account and select one to be your primary email address."
            description="Emails description"
          />
          {/* {translate("emails.long_description")} */}
        </p>
      </div>
      <div id="email-display">
        <DataTable
          {...props}
          data={emails.emails}
          handleStartConfirmation={handleStartConfirmation}
          handleRemove={handleRemove}
          handleMakePrimary={handleMakePrimary}
        />
        <div className={formClass}>
          <FinalForm<EmailFormData>
            onSubmit={handleAdd}
            initialValues={{
              email: "",
            }}
            validate={validateEmailInForm}
            render={(props) => {
              return (
                <form
                  onSubmit={props.handleSubmit}
                  // onChange={handleChange}
                >
                  <FinalField
                    label={translate("profile.email_display_title")}
                    component={CustomInput}
                    componentClass="input"
                    type="text"
                    name="email"
                    disabled={duplicatedEmail}
                    placeholder={emailPlaceholder}
                    helpBlock={
                      // translate("emails.input_help_text")
                      <FormattedMessage defaultMessage="A valid email address" description="Emails input help text" />
                    }
                  />
                  <div className="flex-buttons">
                    <EduIDButton
                      id="email-button"
                      buttonstyle="primary"
                      disabled={!props.valid || props.submitting || props.invalid || props.pristine}
                      onClick={props.handleSubmit}
                    >
                      <FormattedMessage defaultMessage="Add" description="Emails button add" />
                      {/* {translate("emails.button_add")} */}
                    </EduIDButton>
                    <EduIDButton id="email-button" buttonstyle="secondary" onClick={() => handleCancel(props.form)}>
                      <FormattedMessage defaultMessage="Cancel" description="Emails button cancel" />
                      {/* {translate("cm.cancel")} */}
                    </EduIDButton>
                  </div>
                </form>
              );
            }}
          />
        </div>

        <EduIDButton
          id="add-more-button"
          buttonstyle="link"
          className={addLinkClass + " lowercase"}
          onClick={showEmailForm}
        >
          <FormattedMessage defaultMessage="+ add more" description="Emails button add more" />
          {/* {translate("emails.button_add_more")} */}
        </EduIDButton>
      </div>
      <ConfirmModal
        modalId="emailConfirmDialog"
        id="emailConfirmDialogControl"
        // title={translate("emails.confirm_title", {
        //   email: props.confirming,
        // })}
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

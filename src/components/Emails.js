import { translate } from "login/translation";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { Form } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { longCodePattern } from "../login/app_utils/validation/regexPatterns";
import { validate } from "../login/app_utils/validation/validateEmail";
import DataTable from "../login/components/DataTable/DataTable";
import CustomInput from "../login/components/Inputs/CustomInput";
import ConfirmModal from "../login/components/Modals/ConfirmModalContainer";
import "../login/styles/index.scss";
import EduIDButton from "./EduIDButton";
import { isValid } from "redux-form";
import {
  postEmail,
  startConfirmation,
  stopConfirmation,
  startResendEmailCode,
  startVerify,
  startRemove,
  makePrimary,
} from "actions/Emails";
import { clearNotifications } from "reducers/Notifications";
import { useDispatch, useSelector } from "react-redux";

let EmailForm = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.email",
    defaultMessage: "name@example.com",
    description: "placeholder text for email input",
  });
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(postEmail());
  };

  const emails = useSelector((state) => state.emails.emails);
  const valid_email = isValid("emails")(emails);

  return (
    <Form id="emailsview-form" role="form" onSubmit={handleAdd}>
      <fieldset id="emails-form" className="tabpane">
        <Field
          label={translate("profile.email_display_title")}
          component={CustomInput}
          componentClass="input"
          type="text"
          name="email"
          placeholder={placeholder}
          helpBlock={translate("emails.input_help_text")}
        />
      </fieldset>
      <EduIDButton id="email-button" className="settings-button" disabled={!valid_email} onClick={handleAdd}>
        {translate("emails.button_add")}
      </EduIDButton>
    </Form>
  );
};

EmailForm = reduxForm({
  form: "emails",
  validate,
})(EmailForm);

EmailForm = connect((state) => ({
  initialValues: { email: state.emails.email },
  enableReinitialize: true,
}))(EmailForm);

function Emails(props) {
  const [formClass, setFormClass] = useState("hide");
  const [addLinkClass, setAddLinkClass] = useState("btn-link");
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.emails);
  // const email = useSelector((state) => state.emails.email);
  const confirming = useSelector((state) => state.emails.confirming);
  // const resending = useSelector((state) => state.emails.resending);

  function showEmailForm() {
    setFormClass("form-content");
    setAddLinkClass("hide");
    // rendering focus on input, setTimeout for 2 milliseconds to recognize the form
    setTimeout(() => {
      document.getElementById("email").focus();
    }, 200);
  }

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
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

  const handleResend = (e) => {
    e.preventDefault();
    dispatch(startResendEmailCode());
    dispatch(stopConfirmation());
  };

  const handleStartConfirmation = (e) => {
    dispatch(clearNotifications());
    const dataNode = e.target.closest("tr.emailrow"),
      data = {
        identifier: dataNode.getAttribute("data-identifier"),
        email: dataNode.getAttribute("data-object"),
      };
    dispatch(startConfirmation(data));
  };

  const handleStopConfirmation = () => {
    dispatch(stopConfirmation());
  };

  const handleConfirm = () => {
    const data = {
      code: document.getElementById("confirmation-code-area").querySelector("input").value.trim(),
    };
    dispatch(startVerify(data));
    dispatch(stopConfirmation());
  };

  const handleRemove = (e) => {
    const dataNode = e.target.closest("tr.emailrow"),
      data = {
        email: dataNode.getAttribute("data-object"),
      };
    dispatch(startRemove(data));
  };
  const handleMakePrimary = (e) => {
    const dataNode = e.target.closest("tr.emailrow"),
      data = {
        email: dataNode.getAttribute("data-object"),
      };
    dispatch(makePrimary(data));
  };

  return (
    <div className="emailsview-form-container">
      <div className="intro">
        <h4>{translate("emails.main_title")}</h4>
        <p>{translate("emails.long_description")}</p>
      </div>
      <div id="email-display">
        <DataTable
          {...props}
          data={emails}
          handleStartConfirmation={handleStartConfirmation}
          handleRemove={handleRemove}
          handleMakePrimary={handleMakePrimary}
        />
        <div className={formClass}>
          <EmailForm {...props} />
        </div>

        <EduIDButton id="add-more-button" className={addLinkClass} onClick={showEmailForm}>
          {translate("emails.button_add_more")}
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
        placeholder={placeholder}
        showModal={Boolean(confirming)}
        closeModal={handleStopConfirmation}
        handleResend={handleResend}
        handleConfirm={handleConfirm}
        helpBlock={translate("emails.confirm_help_text")}
        validationPattern={longCodePattern}
        validationError={"confirmation.code_invalid_format"}
      />
    </div>
  );
}

export default Emails;

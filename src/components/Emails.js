import { translate } from "login/translation";
import PropTypes from "prop-types";
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

let EmailForm = (props) => {
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.email",
    defaultMessage: "name@example.com",
    description: "placeholder text for email input",
  });
  return (
    <Form id="emailsview-form" role="form" onSubmit={props.handleAdd} className="single-input-form">
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
      <EduIDButton id="email-button" buttonstyle="primary" disabled={!props.valid_email} onClick={props.handleAdd}>
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
  const [addLinkClass, setAddLinkClass] = useState("");

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
    { email: props.confirming }
  );

  return (
    <article className="emailsview-form-container">
      <div className="intro">
        <h3>{translate("emails.main_title")}</h3>
        <p>{translate("emails.long_description")}</p>
      </div>
      <div id="email-display">
        <DataTable
          {...props}
          data={props.emails}
          handleStartConfirmation={props.handleStartConfirmation}
          handleRemove={props.handleRemove}
          handleMakePrimary={props.handleMakePrimary}
        />
        <div className={formClass}>
          <EmailForm {...props} />
        </div>

        <EduIDButton
          id="add-more-button"
          buttonstyle="link"
          className={addLinkClass + " lowercase"}
          onClick={showEmailForm}
        >
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
        showModal={Boolean(props.confirming)}
        closeModal={props.handleStopConfirmation}
        handleResend={props.handleResend}
        handleConfirm={props.handleConfirm}
        helpBlock={translate("emails.confirm_help_text")}
        validationPattern={longCodePattern}
        validationError={"confirmation.code_invalid_format"}
      />
    </article>
  );
}

Emails.propTypes = {
  longDescription: PropTypes.string,
  emails: PropTypes.array,
  confirming: PropTypes.string,
  handleResend: PropTypes.func,
  handleAdd: PropTypes.func,
  handleStartConfirmation: PropTypes.func,
  handleStopConfirmation: PropTypes.func,
  handleRemoveEmail: PropTypes.func,
};

export default Emails;

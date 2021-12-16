import EduIDButton from "components/EduIDButton";
import { translate } from "login/translation";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import Form from "reactstrap/lib/Form";
import { Field, reduxForm } from "redux-form";
import { shortCodePattern } from "../login/app_utils/validation/regexPatterns";
import TableList from "../login/components/DataTable/DataTable";
import CustomInput from "../login/components/Inputs/CustomInput";
import ConfirmModal from "../login/components/Modals/ConfirmModalContainer";
import "../login/styles/index.scss";

const validate = (values, props) => {
  let phone = values.number;
  if (!phone) {
    return { number: "required" };
  }
  phone = phone.replace(/ /g, "");
  if (phone.startsWith("00")) {
    return { number: "phone.e164_format" };
  }
  if (phone.startsWith("0")) {
    phone = "+" + props.default_country_code + phone.substr(1);
  }
  const pattern = /^\+[1-9]\d{6,20}$/;
  if (!pattern.test(phone)) {
    return { number: "phone.phone_format" };
  }
};

let PhoneForm = (props) => {
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.phone",
    defaultMessage: "Phone number",
    description: "placeholder text for phone input",
  });

  return (
    <Form id="phonesview-form" role="form" onSubmit={props.handleAdd}>
      <fieldset id="phone-form" className="tabpane">
        <Field
          label={translate("profile.phone_display_title")}
          component={CustomInput}
          componentClass="input"
          type="text"
          name="number"
          placeholder={placeholder}
          helpBlock={translate("phones.input_help_text")}
        />
      </fieldset>
      <EduIDButton
        id="mobile-button"
        className="settings-button"
        disabled={!props.valid_phone}
        onClick={props.handleAdd}
      >
        {translate("mobile.button_add")}
      </EduIDButton>
    </Form>
  );
};

PhoneForm = reduxForm({
  form: "phones",
  validate,
})(PhoneForm);

PhoneForm = connect((state) => ({
  initialValues: { number: state.phones.phone },
  enableReinitialize: true,
}))(PhoneForm);

function Mobile(props) {
  const [formClass, setFormClass] = useState("hide");
  const [addLinkClass, setAddLinkClass] = useState("btn-link");

  function showEmailForm() {
    setFormClass("form-content");
    setAddLinkClass("hide");
    // rendering focus on input, setTimeout for 200 milliseconds to recognize the form
    setTimeout(() => {
      document.getElementById("number").focus();
    }, 200);
  }

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "mobile.confirm_mobile_placeholder",
    defaultMessage: "Phone confirmation code",
    description: "placeholder text for phone code input",
  });

  const title = intl.formatMessage(
    {
      id: "mobile.confirm_title",
      defaultMessage: "Enter the code sent to {phone}",
      description: "Title for phone code input",
    },
    { phone: props.confirming }
  );

  return (
    <div className="phoneview-form-container" id="phone">
      <div className="intro">
        <h4>{translate("phones.main_title")}</h4>
        <p>{translate("phones.long_description")}</p>
      </div>
      <div id="phone-display">
        <TableList
          data={props.phones}
          handleStartConfirmation={props.handleStartConfirmation}
          handleRemove={props.handleRemove}
          handleMakePrimary={props.handleMakePrimary}
        />
        <div className={formClass}>
          <PhoneForm {...props} />
        </div>
        <EduIDButton id="add-more-button" className={addLinkClass} onClick={showEmailForm}>
          {translate("phones.button_add_more")}
        </EduIDButton>
      </div>
      <ConfirmModal
        modalId="phoneConfirmDialog"
        id="phoneConfirmDialogControl"
        title={title}
        resendLabel={translate("cm.enter_code")}
        resendHelp={translate("cm.lost_code")}
        resendText={translate("cm.resend_code")}
        placeholder={placeholder}
        showModal={Boolean(props.confirming)}
        closeModal={props.handleStopConfirmation}
        handleResend={props.handleResend}
        handleConfirm={props.handleConfirm}
        validationPattern={shortCodePattern}
        validationError={"confirmation.code_invalid_format"}
      />
    </div>
  );
}

Mobile.propTypes = {
  phones: PropTypes.array,
  confirming: PropTypes.string,
  resending: PropTypes.object,
  handleResend: PropTypes.func,
  handleAdd: PropTypes.func,
  handleStartConfirmation: PropTypes.func,
  handleStopConfirmation: PropTypes.func,
  handleRemoveMobile: PropTypes.func,
};

export default Mobile;

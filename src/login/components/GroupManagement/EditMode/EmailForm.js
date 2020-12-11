import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";
import i18n from "../../../translation/InjectIntl_HOC_factory";

export let EmailForm = (props) => {
  return (
    <Form id="emailsview-form" role="form" onSubmit={props.handleAdd}>
      <fieldset id="emails-form" className="tabpane">
        <Field
          label={props.translate("profile.email_display_title")}
          component={CustomInput}
          componentClass="input"
          type="text"
          name="email"
          placeholder="example@example.com"
          helpBlock={props.translate("emails.input_help_text")}
        />
      </fieldset>
      <EduIDButton
        id="email-button"
        className="settings-button"
        disabled={!props.valid_email}
        onClick={props.handleAdd}
      >
        {props.translate("emails.button_add")}
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


EmailForm.propTypes = {
  longDescription: PropTypes.string,
  emails: PropTypes.array,
  handleResend: PropTypes.func,
  handleAdd: PropTypes.func,
  handleRemoveEmail: PropTypes.func,
};

export default i18n(EmailForm);
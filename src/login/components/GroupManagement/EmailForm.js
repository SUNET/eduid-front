import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import EmailInput from "../Inputs/EmailInput";
import EduIDButton from "../../../components/EduIDButton";
import { validate } from "../../app_utils/validation/validateEmail";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const RenderSubmitButton = ({ invalid, translate }) => (
  <EduIDButton
    id="email-button"
    type="submit"
    className="settings-button"
    disabled={invalid}
  >
    {translate("emails.button_add")}
  </EduIDButton>
);

let EmailForm = (props, { submitButton, onSubmit }) => {
  return (
    <Form id="emailsview-form" role="form" onSubmit={onSubmit}>
      <EmailInput {...props} />
      {submitButton && <RenderSubmitButton {...props} />}
    </Form>
  );
};

EmailForm = reduxForm({
  form: "email",
  validate,
  asyncBlurFields: [],
})(EmailForm);

EmailForm = connect(() => ({
  initialValues: {},
  enableReinitialize: true,
  touchOnChange: true,
}))(EmailForm);

// EmailForm.propTypes = {};

export default InjectIntl(EmailForm);

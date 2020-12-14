import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";
import i18n from "../../../translation/InjectIntl_HOC_factory";

let EmailForm = (props) => {
  const { handleSubmit, invalid , translate} = props;
  return (
    <Form id="emailsview-form" role="form" onSubmit={handleSubmit}>
      <fieldset id="emails-form" className="tabpane">
        <Field
          label={translate("profile.email_display_title")}
          component={CustomInput}
          componentClass="input"
          type="text"
          name="email"
          placeholder="example@example.com"
          helpBlock={translate("emails.input_help_text")}
        />
      </fieldset>
      <EduIDButton
        id="email-button"
        type="submit"
        className="settings-button"
        disabled={invalid}
      >
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
  // destroyOnUnmount: false,
}))(EmailForm);

EmailForm.propTypes = {
  longDescription: PropTypes.string,
  emails: PropTypes.array,
  handleSubmit: PropTypes.func,
};

export default i18n(EmailForm);

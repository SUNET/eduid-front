import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../Inputs/CustomInput";
import EduIDButton from "../../../components/EduIDButton";
import { emptyValueValidation } from "../../app_utils/validation/emptyValueValidation";
import i18n from "../../translation/InjectIntl_HOC_factory";

let NameForm = (props) => {
  const { handleSubmit, invalid, form, label, placeholder, helpBlock } = props;

  return (
    <Form id={`${form}-form`} role="form" onSubmit={handleSubmit}>
      <fieldset id={`${form}-fieldset`} className="tabpane">
        <Field
          label={label}
          component={CustomInput}
          componentClass="input"
          type="text"
          name={form}
          placeholder={placeholder}
          helpBlock={helpBlock}
        />
      </fieldset>
      <EduIDButton type="submit" className="settings-button" disabled={invalid}>
        CREATE GROUP
      </EduIDButton>
    </Form>
  );
};

NameForm = reduxForm({
  validate: emptyValueValidation,
})(NameForm);

NameForm = connect(() => ({
  initialValues: {},
  enableReinitialize: true,
}))(NameForm);

NameForm.propTypes = {};

export default i18n(NameForm);

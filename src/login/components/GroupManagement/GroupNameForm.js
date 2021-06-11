import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../Inputs/CustomInput";
import EduIDButton from "../../../components/EduIDButton";
import emptyValueValidation from "../../app_utils/validation/emptyValueValidation";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

export let RenderInput = ({
  placeholder,
  label,
  required,
  form,
  helpBlock,
}) => (
  <Field
    label={label}
    required={required}
    component={CustomInput}
    componentClass="input"
    type="text"
    name={form}
    placeholder={placeholder}
    helpBlock={helpBlock}
  />
);

let GroupNameForm = (props) => {
  const { handleSubmit, invalid, form, submitButton } = props;
  return (
    <Form id={`${form}-form`} role="form" onSubmit={handleSubmit}>
      <RenderInput {...props} />
      {submitButton && (
        <EduIDButton
          type="submit"
          className="settings-button"
          disabled={invalid}
        >
          CREATE GROUP
        </EduIDButton>
      )}
    </Form>
  );
};

GroupNameForm = reduxForm({
  validate: emptyValueValidation,
})(GroupNameForm);

GroupNameForm = connect(() => ({
  initialValues: {},
  enableReinitialize: true,
  touchOnChange: true,
}))(GroupNameForm);

// GroupNameForm.propTypes = {};

export default InjectIntl(GroupNameForm);

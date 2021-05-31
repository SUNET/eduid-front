import React from "react";
import { connect } from "react-redux";
import { reduxForm, FormSection } from "redux-form";
import Form from "reactstrap/lib/Form";
import { RenderEmailInput } from "../../GroupManagement/EmailForm";
import { RenderInput } from "../../GroupManagement/GroupNameForm";
import { validate } from "../../../app_utils/validation/validateEmail";
import { emptyValueValidation } from "../../../app_utils/validation/emptyValueValidation";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const validateLoginForm = (values) => {
  let errors = {};
  const { username, credentials } = values;
  errors.username = validate(username);
  errors.credentials = emptyValueValidation(credentials);
  return errors;
};

let LoginForm = (props) => {
  return (
    <Form id={"create-invite-form"} role="form" onSubmit={() => {}}>
      <FormSection name={"username"}>
        <RenderEmailInput
          {...props}
          submitButton={false}
          required={true}
          autoFocus={true}
        />
      </FormSection>
      <FormSection name={"credentials"}>
        <RenderInput
          form={"password"}
          label={"Password"}
          submitButton={false}
          placeholder={"enter a password"}
          helpBlock={""}
          handleSubmit={() => {}}
        />
      </FormSection>
    </Form>
  );
};

LoginForm = reduxForm({
  form: "loginForm",
  validate: validateLoginForm,
})(LoginForm);

LoginForm = connect(() => ({
  initialValues: {
    username: { email: "" },
    credentials: { password: "" },
  },
  destroyOnUnmount: false,
  touchOnChange: true,
}))(LoginForm);

export default InjectIntl(LoginForm);

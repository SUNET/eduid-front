import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Form from "reactstrap/lib/Form";
import { RenderCheckboxInput } from "../InviteRoleCheckboxes";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const validateEditInvite = () => {
  let errors = {};
  return errors;
};

let EditRolesForm = (props) => {
  const { handleSubmit, checkboxNames } = props;
  return (
    <Form id={"edit-invite-form"} role="form" onSubmit={handleSubmit}>
      {checkboxNames.map(({ name, label }, i) => {
        return (
          <div key={i} className="list-cell">
            <Field
              type="checkbox"
              label={label}
              id={name}
              component={RenderCheckboxInput}
              name={name}
            />
          </div>
        );
      })}
    </Form>
  );
};

EditRolesForm = reduxForm({
  form: "editInviteRole",
  validate: validateEditInvite,
  enableReinitialize: true,
})(EditRolesForm);

EditRolesForm = connect(() => ({
  destroyOnUnmount: false,
}))(EditRolesForm);

// CreateInviteForm.propTypes = {};

export default InjectIntl(EditRolesForm);

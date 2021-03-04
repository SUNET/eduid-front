import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Form from "reactstrap/lib/Form";
import EduIDButton from "../../../../components/EduIDButton";
import { RenderCheckboxInput } from "../InviteRoleCheckboxes";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const validateEditInvite = (values) => {
  // console.log("these are values in validateEditInvite", values);
  let errors = {};
  return errors;
};

let EditRolesForm = (props) => {
  const { handleSubmit, pristine, checkboxNames } = props;

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
  keepDirtyOnReinitialize: true,
})(EditRolesForm);

EditRolesForm = connect(() => ({
  destroyOnUnmount: false,
}))(EditRolesForm);

// CreateInviteForm.propTypes = {};

export default InjectIntl(EditRolesForm);

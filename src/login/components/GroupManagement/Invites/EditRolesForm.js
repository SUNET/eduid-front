import React, { useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { connect, useSelector } from "react-redux";
import Form from "reactstrap/lib/Form";
import { RenderCheckboxInput } from "../InviteRoleCheckboxes";
import validateRoleCheckboxes from "../../../app_utils/validation/validateRoleCheckboxes";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

export const validateEditInvite = (values, props) => {
  let errors = {};
  //console.log("values ", values);
  return errors;
};

export const disableUnchnagedInvites = (invitesFromMeByRole, updatedInvite) => {
  return invitesFromMeByRole.map((invite) =>
    Object.assign({
      ...invite,
      disabled: invite.email.startsWith(updatedInvite.email) ? false : true,
    })
  );
};

let EditRolesForm = (props) => {
  const { handleSubmit, checkboxNames, disabled } = props;
  return (
    <Form id={"edit-invite-form"} role="form">
      {checkboxNames.map(({ name, label }, i) => {
        return (
          <div key={i} className="list-cell">
            <Field
              type="checkbox"
              label={label}
              id={name}
              disabled={disabled}
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
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  touchOnChange: true,
  //   validate: validateEditInvite,
})(EditRolesForm);

EditRolesForm = connect((state) => ({
  state,
  destroyOnUnmount: false,
}))(EditRolesForm);

// CreateInviteForm.propTypes = {};

export default InjectIntl(EditRolesForm);

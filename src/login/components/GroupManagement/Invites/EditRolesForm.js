import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Form from "reactstrap/lib/Form";
import { RenderCheckboxInput } from "../InviteRoleCheckboxes";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let EditRolesForm = (props) => {
  const { checkboxNames, disabled } = props;
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
})(EditRolesForm);

EditRolesForm = connect(() => ({
  destroyOnUnmount: false,
}))(EditRolesForm);

// EditRolesForm.propTypes = {};

export default InjectIntl(EditRolesForm);

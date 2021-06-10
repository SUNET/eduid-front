import React, { Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, FormSection } from "redux-form";
import Form from "reactstrap/lib/Form";
import EmailInput from "../../Inputs/EmailInput";
import InviteRoleCheckboxes from "../InviteRoleCheckboxes";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";
import validateRoleCheckboxes from "../../../app_utils/validation/validateRoleCheckboxes";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const validateCreateInvite = (values) => {
  const { inviteEmail, inviteRoles } = values;
  let errors = {};
  errors.inviteEmail = validate(inviteEmail);
  errors.inviteRoles = validateRoleCheckboxes(inviteRoles);
  return errors;
};

let CreateInviteForm = (props) => {
  const { handleSubmit, invalid } = props;
  return (
    <Fragment>
      <Form id={"create-invite-form"} role="form" onSubmit={handleSubmit}>
        <FormSection name={"inviteEmail"}>
          <EmailInput {...props} submitButton={false} required={true} />
        </FormSection>
        <FormSection name={"inviteRoles"}>
          <InviteRoleCheckboxes {...props} helpBlock={"select one or more"} />
        </FormSection>
        <EduIDButton
          type={"submit"}
          className={"settings-button"}
          disabled={invalid}
        >
          Send Invite
        </EduIDButton>
      </Form>
    </Fragment>
  );
};

CreateInviteForm = reduxForm({
  form: "createInvite",
  validate: validateCreateInvite,
})(CreateInviteForm);

CreateInviteForm = connect(() => ({
  initialValues: {
    inviteEmail: { email: "" },
    inviteRoles: { member: true, owner: false },
  },
  destroyOnUnmount: false,
}))(CreateInviteForm);

// CreateInviteForm.propTypes = {};

export default InjectIntl(CreateInviteForm);

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, FormSection } from "redux-form";
import Form from "reactstrap/lib/Form";
import { RenderEmailInput } from "../EmailForm";
import InviteRoleCheckboxes from "../InviteRoleCheckboxes";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";
import validateCheckboxes from "../../../app_utils/validation/validateCheckboxes";
import i18n from "../../../translation/InjectIntl_HOC_factory";

const validateCreateInvite = (values) => {
  const { inviteEmail, inviteRoles } = values;
  let errors = {};
  errors.inviteEmail = validate(inviteEmail);
  errors.inviteRoles = validateCheckboxes(inviteRoles);
  return errors;
};

let CreateInviteForm = (props) => {
  const { handleSubmit, submitting, invalid } = props;
  return (
    <Fragment>
      <Form id={"create-invite-form"} role="form" onSubmit={handleSubmit}>
        <FormSection name={"inviteEmail"}>
          <RenderEmailInput {...props} submitButton={false} required={true} />
        </FormSection>
        <FormSection name={"inviteRoles"}>
          <InviteRoleCheckboxes {...props} helpBlock={"select one or more"} />
        </FormSection>
        <EduIDButton
          type={"submit"}
          className={"settings-button"}
          disabled={invalid || submitting}
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

CreateInviteForm = connect((state) => ({
  initialValues: {
    inviteEmail: { email: "" },
    inviteRoles: { member: true, owner: false },
  },
}))(CreateInviteForm);

// CreateInviteForm.propTypes = {
//   // longDescription: PropTypes.string,
//   // emails: PropTypes.array,
//   // handleSubmit: PropTypes.func,
// };

export default i18n(CreateInviteForm);

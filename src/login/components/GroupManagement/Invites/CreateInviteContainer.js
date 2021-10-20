import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import CreateInvite from "./CreateInvite";

const mapStateToProps = (state) => {
  let createInviteValues = {};
  let inviteEmail = {};
  let inviteRoles = [];
  if (state.form.createInvite !== undefined) {
    createInviteValues = state.form.createInvite.values;
    inviteEmail = createInviteValues.inviteEmail.email;
    let rolesArr = Object.entries(createInviteValues.inviteRoles);
    inviteRoles = rolesArr
      .map((role) => {
        if (role.includes(true)) {
          return role[0];
        } else {
          return null;
        }
      })
      .filter((role) => role !== null);
  }
  return {
    inviteEmail,
    inviteRoles,
  };
};

const CreateInviteContainer = connect(mapStateToProps, null)(CreateInvite);
export default i18n(CreateInviteContainer);

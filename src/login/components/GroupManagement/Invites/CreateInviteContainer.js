import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import * as inviteActions from "../../../redux/actions/createInviteActions";
import CreateInvite from "./CreateInvite";

const mapStateToProps = (state) => {
  let emailFormValues = { email: "" };
  if (state.form.emails !== undefined) {
    emailFormValues = state.form.emails.values;
  }
  return {
    values: emailFormValues,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createInvite: (email, groupId) => {
      const inviteEmail = email.email;
      dispatch(inviteActions.createInvite(inviteEmail, groupId));
    },
  };
};

const CreateInviteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInvite);
export default i18n(CreateInviteContainer);

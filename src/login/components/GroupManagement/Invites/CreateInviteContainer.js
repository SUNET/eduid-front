import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import * as inviteActions from "../../../redux/actions/createInviteActions";
import CreateInvite from "./CreateInvite";

const mapStateToProps = (state) => {
  return {
    values: state.form.emails.values,
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

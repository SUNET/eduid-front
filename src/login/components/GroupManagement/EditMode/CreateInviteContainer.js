import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import * as inviteActions from "../../../redux/actions/inviteActions";
import CreateInvite from "./CreateInvite";

const mapStateToProps = (state, props) => {
  return {
    values: state.form.emails.values,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    createInvite: (email, groupId) => {
      const inviteEmail = email.email;
      // const groupId = groupId;
      console.log("this is inviteEmail:", inviteEmail);
      console.log("this is groupId:", groupId);
      dispatch(inviteActions.createInvite(inviteEmail, groupId));
    },
  };
};

const CreateInviteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInvite);
export default i18n(CreateInviteContainer);

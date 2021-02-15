import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import * as getAllOutgoingActions from "../../../redux/actions/getOutgoingInvitesActions";
import InvitesParent from "./InvitesParent";

const mapStateToProps = (state) => {
  let groupIdsArray = [];
  let allInvitesFromMe = [];
  if (state.invites.invitesFromMe !== undefined) {
    allInvitesFromMe = state.invites.invitesFromMe;
    groupIdsArray = allInvitesFromMe.map((group) => group.group_identifier);
  }
  return {
    allInvitesFromMe,
    groupsWithInvites: groupIdsArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAllOutgoingInvites: () => {
      dispatch(getAllOutgoingActions.getAllOutgoingInvites());
    },
  };
};

const InvitesParentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitesParent);
export default i18n(InvitesParentContainer);

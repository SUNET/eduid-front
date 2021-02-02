import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import * as getAllOutgoingActions from "../../../redux/actions/getOutgoingInvitesActions";
import InvitesParent from "./InvitesParent";

const mapStateToProps = (state) => {
  let invitesArray = [];
  let groupIdsArray = [];
  if (state.invites.invitesFromMe !== undefined) {
    groupIdsArray = state.invites.invitesFromMe.map(
      (group) => group.group_identifier
    );
    invitesArray = state.invites.invitesFromMe.map((group) => {
      return group.member_invites.concat(group.owner_invites);
    });
  }
  // create new object with group_identifier (value) and memberListArray (key)
  let groupsWithInvites = Object.assign(
    groupIdsArray.map((groupId, i) => ({ [groupId]: invitesArray[i] }))
  );

  return {
    groupsWithInvites: groupsWithInvites,
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

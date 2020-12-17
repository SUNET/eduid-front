import { connect } from "react-redux";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import * as getAllOutgoingActions from "../../../redux/actions/getOutgoingInvitesActions";
import InvitesDataPanel from "./InvitesParent";

const mapStateToProps = (state) => {
  let groupIdsArray = state.invites.invitesFromMe.map(
    (group) => group.group_identifier
  );
  let membersListArray = state.invites.invitesFromMe.map(
    (group) => group.member_invites
  );
  // create new object with group_identifier (value) and memberListArray (key)
  let groupsWithInvites = Object.assign(
    groupIdsArray.map((groupId, i) => {
      return { [groupId]: membersListArray[i] };
    })
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

const InvitesDataPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitesDataPanel);
export default i18n(InvitesDataPanelContainer);

import { connect } from "react-redux";
import GroupManagement from "./GroupManagement";
import * as createGroupActions from "../../redux/actions/createGroupActions";
import * as allDataActions from "../../redux/actions/getAllGroupMgmtDataActions";
import i18n from "../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  // check if user has any gropus
  let noGroups =
    Object.entries(state.groups.member_of).length === 0 &&
    Object.entries(state.groups.owner_of).length === 0;

  // filter out duplicate groups to generate only one list of groups
  let allGroups = state.groups.member_of.concat(state.groups.owner_of);
  let uniqueGroupIds = [...new Set(allGroups.map((group) => group.identifier))];
  let uniqueGroups = allGroups.filter((group, i) => {
    return i === uniqueGroupIds.findIndex((id) => id === group.identifier);
  });

  // create new object listing user relationship with each group
  let userIdentifier = state.groups.data.user_identifier;
  let userGroupsAndRoles = uniqueGroups.map((group, i) => {
    let membershipObj = { group: group, isMember: false, isOwner: false };
    group.members.some((member, i) => {
      if (member.identifier === userIdentifier) {
        return (membershipObj.isMember = true);
      }
    });
    group.owners.some((owner, i) => {
      if (owner.identifier === userIdentifier) {
        return (membershipObj.isOwner = true);
      }
    });
    return membershipObj;
  });

  return {
    noGroups,
    uniqueGroups: userGroupsAndRoles,
    loading: state.groups.loading,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleGetAllData: () => {
      dispatch(allDataActions.getAllData());
    },
    handleCreateGroup: () => {
      dispatch(createGroupActions.createGroup("Test"));
    },
  };
};

const GroupManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupManagement);

export default i18n(GroupManagementContainer);

import { connect } from "react-redux";
import GroupManagement from "./GroupManagement";
import * as createGroupActions from "../../redux/actions/createGroupActions";
import * as allDataActions from "../../redux/actions/getAllDataGroupActions";
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

  // filter out primary email address to look for username among members and owners in groups
  let emailAddresses = state.emails.emails;
  const primaryEmailAddress = emailAddresses.filter(
    (email) => email.primary
  )[0];

  // email request sometimes happens after group data
  const getUsername = () => {
    if (primaryEmailAddress !== undefined) {
      return primaryEmailAddress.email;
    }
    return null;
  };

  //create new object listing user relationship with each group
  let userGroupsAndRoles = uniqueGroups.map((group, i) => {
    let username = getUsername();
    let membershipObj = { group: group, isMember: false, isOwner: false };
    group.members.some((member, i) => {
      if (member.display_name === username) {
        return (membershipObj.isMember = true);
      }
    });
    group.owners.some((owner, i) => {
      if (owner.display_name === username) {
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

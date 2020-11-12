import { connect } from "react-redux";
import Groups from "./Groups";
import * as createGroupActions from "../../../../../redux/actions/createGroupActions";
import * as allDataActions from "../../../../../redux/actions/getAllDataGroupActions";
import i18n from "../../../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  // check if user has any gropus
  let noGroups =
    Object.entries(state.groups.member_of).length === 0 &&
    Object.entries(state.groups.owner_of).length === 0;

  // filer out duplicate groups to generate only one list of groups
  let allGroups = state.groups.member_of.concat(state.groups.owner_of);
  let uniqueGroupIds = [...new Set(allGroups.map((group) => group.identifier))];
  let uniqueGroups = allGroups.filter((group, i) => {
    return i === uniqueGroupIds.findIndex((id) => id === group.identifier);
  });

  return {
    noGroups,
    uniqueGroups,
    primaryEmailAddress: state.emails.emails,
    loading: state.groups.loading,
    data: state.groups.data,
    member_of: state.groups.member_of,
    owner_of: state.groups.owner_of,
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

const GroupsContainer = connect(mapStateToProps, mapDispatchToProps)(Groups);

export default i18n(GroupsContainer);

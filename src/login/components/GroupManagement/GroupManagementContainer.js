import { connect } from "react-redux";
import GroupManagement from "./GroupManagement";
import * as createGroupActions from "../../redux/actions/createGroupActions";
import * as allDataActions from "../../redux/actions/getAllGroupMgmtDataActions";
import i18n from "../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  // check if user has any groups
  let hasNoGroups =
    Object.entries(state.groups.data).length === 0 ||
    Object.entries(state.groups.data.groups).length === 0;
  let groupsData = state.groups.data.groups;

  return {
    hasNoGroups,
    groupsData,
    loading: state.groups.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
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

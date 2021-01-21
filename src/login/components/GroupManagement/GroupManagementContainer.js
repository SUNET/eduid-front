import { connect } from "react-redux";
import GroupManagement from "./GroupManagement";
import * as allDataActions from "../../redux/actions/getAllGroupMgmtDataActions";
import * as createGroupActions from "../../redux/actions/createGroupActions";
import i18n from "../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  let groupsData = state.groups.data
  // check if user has groups
  let hasNoGroups = "";
  if (groupsData !== undefined) {
    hasNoGroups = groupsData.length === 0;
  }

  return {
    hasNoGroups,
    groupsData,
    createGroup: state.groups.createGroup,
    loading: state.groups.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAllData: () => {
      dispatch(allDataActions.getAllData());
    },
    handleOpenCreateGroup: () => {
      dispatch(createGroupActions.openCreateGroup());
    },
    handleCloseCreateGroup: () => {
      dispatch(createGroupActions.closeCreateGroup());
    },
  };
};

const GroupManagementContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupManagement);

export default i18n(GroupManagementContainer);

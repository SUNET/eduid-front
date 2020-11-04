import { connect } from "react-redux";
import Groups from "./Groups";
import * as createGroupActions from "../../../../../redux/actions/createGroupActions";
import * as allDataActions from "../../../../../redux/actions/getAllDataGroupActions";
import i18n from "../../../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  return {
    loading: state.groups.loading,
    data: state.groups.data,
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

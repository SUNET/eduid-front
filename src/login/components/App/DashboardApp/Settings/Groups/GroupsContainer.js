import { connect } from "react-redux";
import Groups from "./Groups";
import * as createGroupActions from "../../../../../redux/actions/createGroupActions";
import * as allDataActions from "../../../../../redux/actions/getAllDataGroupActions";
import i18n from "../../../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  return {
    data: state.groups.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleGetAllData: () => {
      console.log("this is dispatch,", dispatch);
      console.log("this is props,", props);
      // console.log("youre in handleGetAllData");
      dispatch(allDataActions.getAllData());
    },
    handleCreateGroup: () => {
      // console.log("youre in handleCreateGroup");
      dispatch(createGroupActions.createGroup("Test"));
    },
  };
};

const GroupsContainer = connect(mapStateToProps, mapDispatchToProps)(Groups);

export default i18n(GroupsContainer);

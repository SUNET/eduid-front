import { connect } from "react-redux";
import Groups from "./Groups";
import * as actions from "../../../../../redux/actions/createGroupActions";
import i18n from "../../../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  return {
    data: state.groups.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleCreateGroup: () => {
      console.log("youre in handleCreateGroup");
      dispatch(actions.createGroup("Test"));
    },
  };
};

const GroupsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);

export default i18n(GroupsContainer);

import { connect } from "react-redux";
import DeleteGroup from "./DeleteGroup";
import * as deleteGroupActions from "../../../redux/actions/deleteGroupActions";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteGroup: (groupId) => {
      dispatch(deleteGroupActions.deleteGroup(groupId));
    },
  };
};

const DeleteGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteGroup);

export default InjectIntl(DeleteGroupContainer);

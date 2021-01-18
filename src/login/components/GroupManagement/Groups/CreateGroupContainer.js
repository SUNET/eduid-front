import { connect } from "react-redux";
import CreateGroup from "./CreateGroup";
import * as createGroupActions from "../../../redux/actions/createGroupActions";
import i18n from "../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  let groupNameValues = { groupName: "" };
  if (state.form.groupName !== undefined) {
    groupNameValues = state.form.groupName.values;
  }
  return {
    values: groupNameValues,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateGroup: (groupName) => {
      dispatch(createGroupActions.createGroup(groupName));
    },
  };
};

const CreateGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroup);

export default i18n(CreateGroupContainer);

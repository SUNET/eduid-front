import { connect } from "react-redux";
import EditGroup from "./EditGroup";
import * as addDataToStore from "../../../redux/actions/addDataToStoreActions";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  return {
    savedNavId: state.groups.navId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddNavIdToStore: (navId) => {
      dispatch(addDataToStore.addNavId(navId));
    },
  };
};

const EditGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGroup);

export default InjectIntl(EditGroupContainer);

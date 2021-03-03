import { connect } from "react-redux";
import EditGroup from "./EditGroup";
import * as addDataToStore from "../../../redux/actions/addDataToStoreActions";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  return {
    navId: state.groups.navId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddDataToStore: (data) => {
      dispatch(addDataToStore.addData(data));
    },
  };
};

const EditGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGroup);

export default InjectIntl(EditGroupContainer);

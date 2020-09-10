import { connect } from "react-redux";
import DataPanel from "./DataPanel";
import i18n from "../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  return {
    data: state.groups.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const DataPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataPanel);

export default i18n(DataPanelContainer);

import { connect } from "react-redux";
import Groups from "./Groups";
import { postUserdata, changeUserdata } from "actions/PersonalData";
import i18n from "../../../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  return {
    data: state.groups.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const GropusDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);

export default i18n(GropusDataContainer);

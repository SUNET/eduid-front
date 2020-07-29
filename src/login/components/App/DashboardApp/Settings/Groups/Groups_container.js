import { connect } from "react-redux";
import Groups from "./Groups";
import { postUserdata, changeUserdata } from "actions/PersonalData";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  // let langs = [];
  // if (state.config.AVAILABLE_LANGUAGES !== undefined) {
  //   langs = [...state.config.AVAILABLE_LANGUAGES];
  //   // langs.unshift(["", props.translate("pd.choose-language")]);
  // }
  return {
    data: state.groups.data,
    // langs: langs
  };
};

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     handleSave: e => {
//       e.preventDefault();
//       dispatch(postUserdata());
//     }
//   };
// };

const GropusDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);

export default i18n(GropusDataContainer);

import { connect } from "react-redux";
import PersonalData from "components/PersonalData";
import { postUserdata, changeUserdata } from "actions/PersonalData";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  let langs = [];
  if (state.config.available_languages !== undefined) {
    langs = [...state.config.available_languages];
    // langs.unshift(["", props.translate("pd.choose-language")]);
  }
  return {
    data: state.personal_data.data,
    langs: langs
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleSave: e => {
      e.preventDefault();
      dispatch(postUserdata());
    }
  };
};

const PersonalDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalData);

export default i18n(PersonalDataContainer);

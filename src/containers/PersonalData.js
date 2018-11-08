
import { connect } from 'react-redux';
import PersonalData from 'components/PersonalData';
import { postUserdata, changeUserdata } from "actions/PersonalData";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  let langs = [];
  if (state.config.AVAILABLE_LANGUAGES !== undefined) {
      langs = [ ...state.config.AVAILABLE_LANGUAGES ];
      langs.unshift(['', props.l10n('pd.choose-language')]);
  }
  return {
    data: state.personal_data.data,
    langs: langs,
    is_fetching: state.personal_data.is_fetching
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleSave: (e) => {
      e.preventDefault();
      dispatch(postUserdata());
    },
  }
};

const PersonalDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalData);

export default i18n(PersonalDataContainer);

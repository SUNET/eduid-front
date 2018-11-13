
import { connect } from 'react-redux';
import { updateIntl } from 'react-intl-redux';
import Cookies from "js-cookie";

import Footer from 'components/Footer';
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
    is_configured: state.config.is_app_loaded,
    language: state.intl.locale,
    languages: state.config.AVAILABLE_LANGUAGES
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
      changeLanguage: function (e) {
          const lang = e.target.closest('.langselector').dataset.lang;
          const msgs = LOCALIZED_MESSAGES[lang];
          dispatch(updateIntl({
              locale: lang,
              messages : msgs
          }));
      }
  }
};

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);

export default i18n(FooterContainer);

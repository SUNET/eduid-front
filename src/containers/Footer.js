import { connect } from "react-redux";
import { updateIntl } from "react-intl-redux";
import Cookies from "js-cookie";

import Footer from "components/Footer";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  let languages = {};
  if (state.config.available_languages !== undefined) {
    // Old format of lists in list, remove after config update
    if (Array.isArray(state.config.available_languages)) {
      state.config.available_languages.forEach(l => {
        languages[l[0]] = l[1];
      });
    } else {
      // This is the new format, keep this after config update
      languages = state.config.available_languages
    }
  }
  return {
    language: state.intl.locale,
    languages: languages,
    reload_to: state.config.dashboard_url,
    faq_link: state.config.static_faq_url
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    changeLanguage: function(e) {
      const lang = e.target.closest(".lang-selected").dataset.lang;
      const msgs = LOCALIZED_MESSAGES[lang];
      dispatch(
        updateIntl({
          locale: lang,
          messages: msgs
        })
      );
    },
    changeDashboardSession: function(reload_to) {
      return e => {
        e.preventDefault();
        Cookies.remove("eduid-dashboard-version");
        Cookies.set("eduid-dashboard-version", "1");
        window.location = reload_to;
      };
    }
  };
};

const FooterContainer = connect(mapStateToProps, mapDispatchToProps)(Footer);

export default i18n(FooterContainer);

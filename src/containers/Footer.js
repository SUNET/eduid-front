import { connect } from "react-redux";
import { updateIntl } from "react-intl-redux";
import Cookies from "js-cookie";

import Footer from "components/Footer";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  const languages = {};
  if (state.config.AVAILABLE_LANGUAGES !== undefined) {
    state.config.AVAILABLE_LANGUAGES.forEach(l => {
      languages[l[0]] = l[1];
    });
  }
  return {
    is_configured: state.config.is_configured,
    language: state.intl.locale,
    languages: languages,
    reload_to: state.config.DASHBOARD_URL
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    changeLanguage: function(e) {
      const lang = e.target.closest(".langselector").dataset.lang;
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

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);

export default i18n(FooterContainer);

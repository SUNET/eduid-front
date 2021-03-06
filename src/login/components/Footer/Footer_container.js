import { connect } from "react-redux";
import { updateIntl } from "react-intl-redux";
import Cookies from "js-cookie";

import Footer from "./Footer";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  const languages = {};
  if (AVAILABLE_LANGUAGES !== undefined) {
    AVAILABLE_LANGUAGES.forEach(l => {
      languages[l[0]] = l[1];
    });
  }
  return {
    is_configured: state.config.is_configured,
    language: state.intl.locale,
    languages: languages,
    reload_to: state.config.dashboard_url,
    faq_link: state.config.static_faq_url
  };
};

const mapDispatchToProps = (dispatch) => {
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

export default InjectIntl(FooterContainer);

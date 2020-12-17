import { connect } from "react-redux";
import Splash from "components/Splash";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  return {
    is_app_loaded: state.config.is_app_loaded
  };
};

const SplashContainer = connect(mapStateToProps)(Splash);

export default i18n(SplashContainer);

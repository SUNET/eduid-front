import { connect } from "react-redux";
import Splash from "./Splash";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  return {
    is_loaded: state.app.is_loaded
  };
};

const SplashContainer = connect(mapStateToProps)(Splash);

export default i18n(SplashContainer);

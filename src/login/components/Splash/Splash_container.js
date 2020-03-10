import { connect } from "react-redux";
import Splash from "./Splash";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  return {
    is_loaded: state.app.is_loaded
  };
};

const SplashContainer = connect(mapStateToProps)(Splash);

export default InjectIntl(SplashContainer);

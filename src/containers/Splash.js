
import { connect } from 'react-redux';
import Splash from 'components/Splash';
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
    return {
        is_app_loaded: state.config.is_app_loaded
    }
};

const SplashContainer = connect(
  mapStateToProps
)(Splash);

export default i18n(SplashContainer);

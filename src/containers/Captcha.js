
import { connect } from 'react-redux';
import Captcha from 'components/Captcha';
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
    is_fetching: state.main.is_fetching
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

const CaptchaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Captcha);

export default i18n(CaptchaContainer);



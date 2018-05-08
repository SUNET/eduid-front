
import { connect } from 'react-redux';
import Captcha from 'components/Captcha';
import * as actions from "actions/Captcha";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
    is_fetching: state.main.is_fetching,
    recaptcha_key: state.main.recaptcha_public_key
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    loadedCaptcha: () => {
      console.log('Loaded recaptcha');
    },
    handleCaptcha: (response) => {
      dispatch(actions.verifyCaptcha(response));
    },
    sendCaptcha: (e) => {
      dispatch(actions.postCaptcha());
    },
  }
};

const CaptchaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Captcha);

export default i18n(CaptchaContainer);



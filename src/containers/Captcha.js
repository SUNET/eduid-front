
import { connect } from 'react-redux';
import Captcha from 'components/Captcha';
import { history } from "components/SignupMain";
import * as actions from "actions/Captcha";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
    recaptcha_key: state.config.recaptcha_public_key
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
    cancelCaptcha: (e) => {
        dispatch(history.push('email'));
    },
  }
};

const CaptchaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Captcha);

export default i18n(CaptchaContainer);



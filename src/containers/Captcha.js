import { connect } from "react-redux";
import Captcha from "components/Captcha";
import { history } from "components/SignupMain";
import * as actions from "actions/Captcha";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  return {
    recaptcha_key: state.config.recaptcha_public_key
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadedCaptcha: () => {
      console.log("Loaded recaptcha");
    },
    handleCaptcha: response => {
      dispatch(actions.verifyCaptcha(response));
    },
    sendCaptcha: () => {
      dispatch(actions.postCaptcha());
    },
    cancelCaptcha: () => {
      history.push("email");
    }
  };
};

const CaptchaContainer = connect(mapStateToProps, mapDispatchToProps)(Captcha);

export default i18n(CaptchaContainer);

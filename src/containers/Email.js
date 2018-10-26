
import { connect } from 'react-redux';
import Email from 'components/Email';
import * as actions from "actions/Email";
import i18n from 'i18n-messages';
import { history } from "components/SignupMain";


const mapStateToProps = (state, props) => {
    const lang = state.intl.locale;
    let tou = '';
    if (state.config.tous !== undefined) {
        tou = state.config.tous[lang];
    }
    return {
        size: state.config.window_size,
        acceptingTOU: state.email.acceptingTOU,
        tou: tou
    }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleEmail: function (e) {
      e.preventDefault();
      if (this.anyTouched && this.valid) {
          const email = document.getElementById('email-input').value;
          dispatch(actions.addEmail(email));
      } else {
          this.touch('email');
      }
    },
    handleAccept: (e) => {
      e.preventDefault();
      dispatch(actions.acceptTOU());
      history.push("trycaptcha");
    },
    handleReject: (e) => {
      e.preventDefault();
      dispatch(actions.rejectTOU());
    }
  }
};

const EmailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Email);

export default i18n(EmailContainer);


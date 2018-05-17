
import { connect } from 'react-redux';
import Email from 'components/Email';
import * as actions from "actions/Email";
import i18n from 'i18n-messages';
import { history } from "components/Main";


const mapStateToProps = (state, props) => {
  return {
    acceptingTOU: state.email.acceptingTOU,
    tou: state.main.tou
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleEmail: (e) => {
      e.preventDefault();
      const email = document.getElementById('email-input').value;
      dispatch(actions.addEmail(email));
    },
    handleAccept: (e) => {
      e.preventDefault();
      dispatch(actions.acceptTOU());
      history.push("/trycaptcha");
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


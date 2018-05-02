
import { connect } from 'react-redux';
import Email from 'components/Email';
import * as actions from "actions/Email";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
    is_fetching: state.main.is_fetching
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleEmail: (e) => {
      e.preventDefault();
      const email = document.getElementById('email-input').value;
      dispatch(actions.addEmail(email));
    },
  }
};

const EmailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Email);

export default i18n(EmailContainer);


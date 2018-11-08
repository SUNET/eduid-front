
import { connect } from 'react-redux';
import { isValid } from "redux-form";
import Emails from 'components/Emails';
import { postEmail, changeEmail, startConfirmation, stopConfirmation, startResendEmailCode,
         finishConfirmation, startVerify, requestRemoveEmail, startRemove, makePrimary } from "actions/Emails";
import { eduidRMAllNotify } from "actions/Notifications";
import i18n from 'i18n-messages';

const mapStateToProps = (state, props) => {
  const pdata_fetching = state.personal_data ?
                         state.personal_data.is_fetching :
                         false;
  return {
    emails: state.emails.emails,
    valid_email: isValid('emails')(state),
    email: state.emails.email,
    is_fetching: state.emails.is_fetching || pdata_fetching,
    confirming: state.emails.confirming,
    resending: state.emails.resending,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleAdd: (e) => {
        dispatch(postEmail());
    },
    handleResend: function (e) {
        e.preventDefault();
        dispatch(startResendEmailCode());
    },
    handleStartConfirmation: function (e) {
        dispatch(eduidRMAllNotify());
        const dataNode = e.target.closest("tr.emailrow"),
              data = {
                  identifier: dataNode.getAttribute('data-identifier'),
                  email: dataNode.getAttribute('data-object')
              };
        dispatch(startConfirmation(data));

    },
    handleStopConfirmation: function (e) {
        dispatch(stopConfirmation());
    },
    handleConfirm: function (e) {
        const data = {
            code: document.getElementById('confirmation-code-area').querySelector('input').value
        };
        dispatch(startVerify(data));
        dispatch(stopConfirmation());
    },
    handleRemove: function (e) {
        const dataNode = e.target.closest("tr.emailrow"),
              data = {
                  email: dataNode.getAttribute('data-object')
              };
        dispatch(startRemove(data))
    },
    handleMakePrimary: (e) => {
        const dataNode = e.target.closest("tr.emailrow"),
              data = {
                  email: dataNode.getAttribute('data-object')
              };
        dispatch(makePrimary(data))
    },
  }
};

const EmailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Emails);

export default i18n(EmailsContainer);


import { connect } from "react-redux";
import { isValid } from "redux-form";
import Emails from "components/Emails";
import {
  postEmail,
  startConfirmation,
  stopConfirmation,
  startResendEmailCode,
  startVerify,
  startRemove,
  makePrimary
} from "actions/Emails";
import { eduidRMAllNotify } from "actions/Notifications";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  return {
    emails: state.emails.emails,
    valid_email: isValid("emails")(state),
    email: state.emails.email,
    confirming: state.emails.confirming,
    resending: state.emails.resending
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: e => {
      e.preventDefault();
      dispatch(postEmail());
    },
    handleResend: function(e) {
      e.preventDefault();
      dispatch(startResendEmailCode());
      dispatch(stopConfirmation());
    },
    handleStartConfirmation: function(e) {
      dispatch(eduidRMAllNotify());
      const dataNode = e.target.closest("tr.emailrow"),
        data = {
          identifier: dataNode.getAttribute("data-identifier"),
          email: dataNode.getAttribute("data-object")
        };
      dispatch(startConfirmation(data));
    },
    handleStopConfirmation: function() {
      dispatch(stopConfirmation());
    },
    handleConfirm: function() {
      const data = {
        code: document
          .getElementById("confirmation-code-area")
          .querySelector("input").value.trim()
      };
      dispatch(startVerify(data));
      dispatch(stopConfirmation());
    },
    handleRemove: function(e) {
      const dataNode = e.target.closest("tr.emailrow"),
        data = {
          email: dataNode.getAttribute("data-object")
        };
      dispatch(startRemove(data));
    },
    handleMakePrimary: e => {
      const dataNode = e.target.closest("tr.emailrow"),
        data = {
          email: dataNode.getAttribute("data-object")
        };
      dispatch(makePrimary(data));
    }
  };
};

const EmailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Emails);

export default i18n(EmailsContainer);

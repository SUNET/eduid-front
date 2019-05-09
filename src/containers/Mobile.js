import { connect } from "react-redux";
import { isValid } from "redux-form";
import Mobile from "components/Mobile";
import {
  makePrimary,
  postMobile,
  startResendMobileCode,
  finishConfirmation,
  startConfirmation,
  stopConfirmation,
  startVerify,
  startRemove
} from "actions/Mobile";
import { eduidRMAllNotify } from "actions/Notifications";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  return {
    phones: state.phones.phones,
    valid_phone: isValid("phones")(state),
    phone: state.phones.phone,
    confirming: state.phones.confirming,
    resending: state.phones.resending,
    default_country_code: state.config.DEFAULT_COUNTRY_CODE
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleAdd: e => {
      dispatch(postMobile());
    },
    handleResend: function(e) {
      e.preventDefault();
      dispatch(startResendMobileCode());
      dispatch(stopConfirmation());
    },
    handleStartConfirmation: function(e) {
      dispatch(eduidRMAllNotify());
      const dataNode = e.target.closest("tr.emailrow"),
        data = {
          identifier: dataNode.getAttribute("data-identifier"),
          phone: dataNode.getAttribute("data-object")
        };

      dispatch(startConfirmation(data));
    },
    handleStopConfirmation: function(e) {
      dispatch(stopConfirmation());
    },
    handleConfirm: function(e) {
      const data = {
        code: document
          .getElementById("confirmation-code-area")
          .querySelector("input").value
      };
      dispatch(startVerify(data));
      dispatch(stopConfirmation());
    },
    handleRemove: function(e) {
      const dataNode = e.target.closest("tr.emailrow"),
        data = {
          phone: dataNode.getAttribute("data-object")
        };
      dispatch(startRemove(data));
    },
    handleMakePrimary: e => {
      const dataNode = e.target.closest("tr.emailrow"),
        data = {
          phone: dataNode.getAttribute("data-object")
        };
      dispatch(makePrimary(data));
    }
  };
};

const MobileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mobile);

export default i18n(MobileContainer);

import { connect } from "react-redux";
import { isValid } from "redux-form";
import LookupMobileProofing from "components/LookupMobileProofing";
import { eduidRMAllNotify } from "actions/Notifications";
import {
  showModal,
  closeModal,
  postLookupMobile
} from "actions/LookupMobileProofing";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  console.log("this is the state", state);
  return {
    disabled: !isValid("nins")(state),
    showModal: state.lookup_mobile.showModal,
    phoneNumbers: state.phones.phones,
    nins: state.nins.nins
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleShowModal: function(e) {
      dispatch(eduidRMAllNotify());
      dispatch(showModal());
      // dispatch(postLookupMobile());
    },
    handleCloseModal: function(e) {
      dispatch(eduidRMAllNotify());
      dispatch(closeModal());
      // dispatch(postLookupMobile());
    },
    handleLookupMobile: function(e) {
      dispatch(closeModal());
      dispatch(postLookupMobile());
    }
  };
};

const LookupMobileProofingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LookupMobileProofing);

export default i18n(LookupMobileProofingContainer);

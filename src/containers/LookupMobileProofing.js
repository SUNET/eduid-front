import { connect } from "react-redux";
import { isValid } from "redux-form";
import LookupMobileProofing from "components/LookupMobileProofing";
import { eduidRMAllNotify } from "actions/Notifications";
import {
  showModal,
  closeModal,
  postLookupMobile
} from "actions/LookupMobileProofing";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  const phoneNumbers = state.phones.phones;
  const primaryPhoneNumber = phoneNumbers.filter((num) => num.primary === true);
  return {
    disabled: !isValid("nins")(state),
    showModal: state.lookup_mobile.showModal,
    phoneNumbers,
    primaryPhoneNumber,
    nins: state.nins.nins,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleShowModal: function(e) {
      dispatch(eduidRMAllNotify());
      dispatch(showModal());
    },
    handleCloseModal: function(e) {
      dispatch(eduidRMAllNotify());
      dispatch(closeModal());
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

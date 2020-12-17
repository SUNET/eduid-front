import { connect } from "react-redux";
import LookupMobileProofing from "components/LookupMobileProofing";
import { eduidRMAllNotify } from "actions/Notifications";
import {
  showModal,
  closeModal,
  postLookupMobile
} from "actions/LookupMobileProofing";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  return {
    withoutNin: !state.nins.nins[0],
    withoutPhoneNumber: !state.phones.phones.length,
    notVerifiedNumber: !state.phones.phones.some((num) => num.verified === true),
    nonSweNumber: !state.phones.phones.some((num) => num.number.includes(+46)),
    showModal: state.lookup_mobile.showModal,
    nins: state.nins.nins,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowModal: function() {
      dispatch(eduidRMAllNotify());
      dispatch(showModal());
    },
    handleCloseModal: function() {
      dispatch(eduidRMAllNotify());
      dispatch(closeModal());
    },
    handleLookupMobile: function() {
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

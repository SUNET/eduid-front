import { connect } from "react-redux";
import LookupMobileProofing from "./LookupMobileProofing";
import { clearNotifications } from "../../../reducers/Notifications";
import { showModal, closeModal, postLookupMobile } from "../../../actions/LookupMobileProofing";
import i18n from "../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  return {
    withoutNin: !state.nins.nins[0],
    withoutPhoneNumber: !state.phones.phones.length,
    unverifiedNumber: !state.phones.phones.some((num) => num.verified === true),
    nonSweNumber: !state.phones.phones.some((num) => num.number.includes(+46)),
    showModal: state.lookup_mobile.showModal,
    nins: state.nins.nins,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowModal: function () {
      dispatch(clearNotifications());
      dispatch(showModal());
    },
    handleCloseModal: function () {
      dispatch(clearNotifications());
      dispatch(closeModal());
    },
    handleLookupMobile: function () {
      dispatch(closeModal());
      dispatch(postLookupMobile());
    },
  };
};

const LookupMobileProofingContainer = connect(mapStateToProps, mapDispatchToProps)(LookupMobileProofing);

export default i18n(LookupMobileProofingContainer);

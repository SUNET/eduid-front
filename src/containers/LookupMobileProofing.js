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
  const withoutNin = !state.nins.nins[0];
  const withoutPhoneNumber = !state.phones.phones.length;
  const notVerified = !state.phones.phones.some((num) => num.verified === true);
  const nonSweNumber = !state.phones.phones.some((num) => num.number.includes(+46));
  return {
    withoutNin: withoutNin,
    withoutPhoneNumber: withoutPhoneNumber,
    notVerified: notVerified,
    nonSweNumber: nonSweNumber,
    showModal: state.lookup_mobile.showModal,
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

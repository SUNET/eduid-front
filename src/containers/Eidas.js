import { connect } from "react-redux";
import Eidas from "components/Eidas";
import { showEidasModal, hideEidasModal } from "actions/Eidas";
import { eduidRMAllNotify } from "actions/Notifications";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  let eidas_sp_url = state.config.EIDAS_URL;
  let freja_idp_url = state.config.TOKEN_VERIFY_IDP;
  let verify_path = "verify-nin";
  if (!eidas_sp_url.endsWith("/")) {
    eidas_sp_url = eidas_sp_url.concat("/");
  }
  let eidas_sp_freja_idp_url =
    eidas_sp_url + verify_path + "?idp=" + freja_idp_url;
  return {
    showModal: state.eidas_data.showModal,
    eidas_sp_freja_idp_url: eidas_sp_freja_idp_url
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleShowModal: function(e) {
      dispatch(eduidRMAllNotify());
      dispatch(showEidasModal());
    },
    handleHideModal: function(e) {
      dispatch(hideEidasModal());
    }
  };
};

const EidasContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Eidas);

export default i18n(EidasContainer);

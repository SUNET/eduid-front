import { connect } from "react-redux";
import Eidas from "components/Eidas";
import { showEidasModal, hideEidasModal } from "actions/Eidas";
import { eduidRMAllNotify } from "actions/Notifications";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  let eidas_sp_url = state.config.eidas_url;
  let freja_idp_url = state.config.token_verify_idp;
  let verify_path = "verify-nin";
  if (!eidas_sp_url.endsWith("/")) {
    eidas_sp_url = eidas_sp_url.concat("/");
  }
  let eidas_sp_freja_idp_url = eidas_sp_url + verify_path + "?idp=" + freja_idp_url;
  return {
    showModal: state.eidas_data.showModal,
    eidas_sp_freja_idp_url: eidas_sp_freja_idp_url,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowModal: function () {
      dispatch(eduidRMAllNotify());
      dispatch(showEidasModal());
    },
    handleHideModal: function () {
      dispatch(hideEidasModal());
    },
  };
};

const EidasContainer = connect(mapStateToProps, mapDispatchToProps)(Eidas);

export default i18n(EidasContainer);

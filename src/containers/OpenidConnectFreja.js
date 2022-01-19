import { connect } from "react-redux";
import OpenidConnectFreja from "components/OpenidConnectFreja";
import {
  postOpenidFreja,
  getOpenidFreja,
  showOpenidFrejaModal,
  hideOpenidFrejaModal,
} from "actions/OpenidConnectFreja";
import { clearNotifications } from "reducers/Notifications";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  return {
    iaRequestData: state.openid_freja_data.iaRequestData,
    nin: state.openid_freja_data.nin,
    showModal: state.openid_freja_data.showModal,
    error: state.openid_freja_data.error,
    // Used until we deploy the nin component
    proofing_methods: state.config.proofing_methods,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInitializeFrejaProofing: function () {
      dispatch(postOpenidFreja());
    },
    handleFetchFrejaProofing: function () {
      dispatch(getOpenidFreja());
    },
    handleShowModal: function () {
      dispatch(clearNotifications());
      dispatch(showOpenidFrejaModal());
    },
    handleHideModal: function () {
      dispatch(hideOpenidFrejaModal());
    },
  };
};

const OpenidConnectFrejaContainer = connect(mapStateToProps, mapDispatchToProps)(OpenidConnectFreja);

export default i18n(OpenidConnectFrejaContainer);

import { connect } from "react-redux";
import OpenidConnect from "components/OpenidConnect";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import { eduidRMAllNotify } from "../actions/Notifications";
import {
  showOpenidSelegModal,
  hideOpenidSelegModal
} from "../actions/OpenidConnect";

const mapStateToProps = (state) => {
  return {
    qr_img: state.openid_data.qr_img,
    qr_code: state.openid_data.qr_code,
    nin: state.openid_data.nin,
    showModal: state.openid_data.showModal,
    error: state.openid_data.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowModal: function() {
      dispatch(showOpenidSelegModal());
      dispatch(eduidRMAllNotify());
    },
    handleHideModal: function() {
      dispatch(hideOpenidSelegModal());
    }
  };
};

const OpenidConnectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenidConnect);

export default i18n(OpenidConnectContainer);

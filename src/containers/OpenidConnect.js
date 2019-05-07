import { connect } from "react-redux";
import OpenidConnect from "components/OpenidConnect";
import i18n from "i18n-messages";
import { eduidRMAllNotify } from "../actions/Notifications";
import {
  showOpenidSelegModal,
  hideOpenidSelegModal
} from "../actions/OpenidConnect";
import { getNins } from "../actions/Nins";

const mapStateToProps = (state, props) => {
  return {
    qr_img: state.openid_data.qr_img,
    qr_code: state.openid_data.qr_code,
    nin: state.openid_data.nin,
    showModal: state.openid_data.showModal,
    error: state.openid_data.error
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleShowModal: function(e) {
      dispatch(showOpenidSelegModal());
      dispatch(eduidRMAllNotify());
    },
    handleHideModal: function(e) {
      dispatch(hideOpenidSelegModal());
    }
  };
};

const OpenidConnectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenidConnect);

export default i18n(OpenidConnectContainer);

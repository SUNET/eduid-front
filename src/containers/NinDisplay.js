import { connect } from "react-redux";
import NinDisplay from "components/NinDisplay";
import i18n from "i18n-messages";
import * as actions from "actions/Nins";

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleDelete: function (e) {
      const ninNumber = e.target.closest("#nin-display-container").firstChild
        .dataset.ninnumber;
      dispatch(actions.startRemove(ninNumber));
    }
  };
};

const NinDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NinDisplay);

export default i18n(NinDisplayContainer);
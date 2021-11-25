import { connect } from "react-redux";
import NinDisplay from "components/NinDisplay";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import ninsSlice from "reducers/Nins";

const mapStateToProps = (state) => {
  return {
    showNinAtProfile: state.nins.showNinAtProfile,
    showNinAtIdentity: state.nins.showNinAtIdentity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: function (e) {
      const ninNumber = e.target.closest(".profile-grid-cell").children[1].dataset.ninnumber;
      dispatch(ninsSlice.actions.startRemove(ninNumber));
    },
    toggleShowNinAtProfile: function () {
      dispatch(ninsSlice.actions.showNinAtProfile());
    },
    toggleShowNinAtIdentity: function () {
      dispatch(ninsSlice.actions.showNinAtIdentity());
    },
  };
};

const NinDisplayContainer = connect(mapStateToProps, mapDispatchToProps)(NinDisplay);

export default i18n(NinDisplayContainer);

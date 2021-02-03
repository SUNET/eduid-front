import { connect } from "react-redux";
import NinDisplay from "components/NinDisplay";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import * as actions from "actions/Nins";

const mapStateToProps = (state) => {
  return {
    showNinProfile: state.nins.showNinProfile,
    showNinIdentity: state.nins.showNinIdentity
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: function (e) {
      const ninNumber = e.target.closest(".profile-grid-cell").children[1]
        .dataset.ninnumber;
      dispatch(actions.startRemove(ninNumber));
    },
    toggleShowNinProfile: function() {
      dispatch(actions.showNinProfile());
    },
    toggleShowNinIdentity: function() {
      dispatch(actions.showNinIdentity());
    },
  };
};

const NinDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NinDisplay);

export default i18n(NinDisplayContainer);

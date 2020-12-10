import { connect } from "react-redux";
import NinDisplay from "components/NinDisplay";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import * as actions from "actions/Nins";

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: function (e) {
      const ninNumber = e.target.closest(".profile-grid-cell").children[1]
        .dataset.ninnumber;
      dispatch(actions.startRemove(ninNumber));
    },
  };
};

const NinDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NinDisplay);

export default i18n(NinDisplayContainer);

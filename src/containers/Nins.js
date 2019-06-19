import { connect } from "react-redux";
import { isValid } from "redux-form";
import Nins from "components/Nins";
import * as actions from "actions/Nins";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  return {
    verifyingLetter: state.letter_proofing.verifyingLetter,
    nins: state.nins.nins,
    is_configured: state.config.is_configured,
    proofing_methods: state.config.PROOFING_METHODS,
    valid_nin: isValid("nins")(state),
    nin: state.nins.nin,
    message: state.nins.message
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleDelete: function(e) {
      const nin = e.target.closest(".nin-holder").dataset.ninnumber;
      dispatch(actions.startRemove(nin));
    }
  };
};

const NinsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nins);

export default i18n(NinsContainer);

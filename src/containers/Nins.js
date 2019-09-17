import { connect } from "react-redux";
import { isValid } from "redux-form";
import VerifyIdentity from "containers/VerifyIdentity";
import * as actions from "actions/Nins";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  let confirmed;
  const nins = state.nins.nins.filter(nin => nin.verified);
  if (nins.length >= 1) {
    confirmed = true;
  } else {
    confirmed = false;
  }
  return {
    verifyingLetter: state.letter_proofing.verifyingLetter,
    nins: state.nins.nins,
    is_configured: state.config.is_configured,
    proofing_methods: state.config.PROOFING_METHODS,
    valid_nin: isValid("nins")(state),
    nin: state.nins.nin,
    message: state.nins.message,
    confirmed: confirmed
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // handleDelete: function(e) {
    //   const nin = e.target.closest(".nin-holder").dataset.ninnumber;
    //   dispatch(actions.startRemove(nin));
    // }
  };
};

const NinsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyIdentity);

export default i18n(NinsContainer);

import { connect } from "react-redux";
import { isValid } from "redux-form";
import VerifyIdentity from "containers/VerifyIdentity";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
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
    proofing_methods: state.config.proofing_methods,
    valid_nin: isValid("nins")(state),
    nin: state.nins.nin,
    message: state.nins.message,
    confirmed: confirmed
  };
};

const mapDispatchToProps = () => {
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

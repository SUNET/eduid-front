import { connect } from "react-redux";
import { isValid } from "redux-form";
import LetterProofingButton from "components/LetterProofing";
import * as actions from "actions/LetterProofing";
import { eduidRMAllNotify } from "actions/Notifications";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  const confirming = state.letter_proofing.confirmingLetter,
    valid_nin = isValid("nins")(state),
    confirmingLetter = confirming && valid_nin;
  return {
    confirmingLetter: confirmingLetter,
    verifyingLetter: state.letter_proofing.verifyingLetter,
    valid_nin: isValid("nins")(state),
    nin: state.nins.nin
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleLetterProofing: function(e) {
      dispatch(eduidRMAllNotify());
      dispatch(actions.getLetterProofingState());
    },
    confirmLetterProofing: function(e) {
      dispatch(actions.postLetterProofingSendLetter());
      dispatch(actions.stopLetterConfirmation());
    },
    sendConfirmationCode: function(e) {
      e.preventDefault();
      const data = {
        code: document
          .getElementById("confirmation-code-area")
          .querySelector("input").value
      };
      dispatch(actions.postLetterProofingVerificationCode(data));
      dispatch(actions.stopLetterVerification());
    },
    handleStopConfirmationLetter: function(e) {
      dispatch(actions.stopLetterConfirmation());
    },
    handleStopVerificationLetter: function(e) {
      dispatch(actions.stopLetterVerification());
    }
  };
};

const LetterProofingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterProofingButton);

export default i18n(LetterProofingContainer);

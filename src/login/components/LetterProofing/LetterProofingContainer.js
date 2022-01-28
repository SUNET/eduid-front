import { connect } from "react-redux";
import { isValid } from "redux-form";
import LetterProofingButton from "./LetterProofing";
import * as actions from "../../../actions/LetterProofing";

const mapStateToProps = (state) => {
  const letterVerification = state.letter_proofing.confirmingLetter;
  const swedishNin = isValid("nins")(state);
  const requestLetterAllowed = (letterVerification && swedishNin) || state.letter_proofing.letter_expired;

  return {
    requestLetterAllowed,
    verifyingLetter_sent: state.letter_proofing.verifyingLetter,
    letter_sent_date: state.letter_proofing.letter_sent,
    letter_expires_date: state.letter_proofing.letter_expires,
    letter_expired: state.letter_proofing.letter_expired,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmLetterProofing: function () {
      dispatch(actions.postLetterProofingSendLetter());
    },
    sendConfirmationCode: function (e) {
      e.preventDefault();
      const data = {
        code: document.getElementById("confirmation-code-area").querySelector("input").value.trim(),
      };
      dispatch(actions.postLetterProofingVerificationCode(data));
      dispatch(actions.stopLetterVerification());
    },
    handleStopConfirmationLetter: function () {
      dispatch(actions.stopLetterConfirmation());
    },
    handleStopVerificationLetter: function () {
      dispatch(actions.stopLetterVerification());
    },
  };
};

const LetterProofingContainer = connect(mapStateToProps, mapDispatchToProps)(LetterProofingButton);

export default LetterProofingContainer;

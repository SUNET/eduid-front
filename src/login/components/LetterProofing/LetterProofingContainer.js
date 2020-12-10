import { connect } from "react-redux";
import { isValid } from "redux-form";
import LetterProofingButton from "./LetterProofing";
import * as actions from "../../../actions/LetterProofing";
import i18n from "../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  const confirming = state.letter_proofing.confirmingLetter;
  const valid_nin = isValid("nins")(state);
  const confirmingLetter = confirming && valid_nin || state.letter_proofing.letter_expired;
  let withoutNin = !state.nins.nins[0]
  return {
    disabled: withoutNin,
    confirmingLetter: confirmingLetter,
    verifyingLetter_sent: state.letter_proofing.verifyingLetter,
    letter_sent_date: state.letter_proofing.letter_sent,
    letter_expires_date: state.letter_proofing.letter_expires,
    letter_expired: state.letter_proofing.letter_expired
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    confirmLetterProofing: function(e) {
      dispatch(actions.postLetterProofingSendLetter());
    },
    sendConfirmationCode: function(e) {
      e.preventDefault();
      const data = {
        code: document
          .getElementById("confirmation-code-area")
          .querySelector("input").value.trim(),
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

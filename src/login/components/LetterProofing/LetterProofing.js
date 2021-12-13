import { translate } from "login/translation";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { shortCodePattern } from "../../app_utils/validation/regexPatterns";
import ConfirmModal from "../Modals/ConfirmModalContainer";
import NotificationModal from "../Modals/NotificationModal";

function LetterProofingButton(props) {
  const [letterExpired, setLetterExpired] = useState(false);
  const [letterExpiresDate, setLetterExpiresDate] = useState("");
  const [verifyingLetterSent, setVerifyingLetterSent] = useState(false);
  const [confirmingLetter, setConfirmingLetter] = useState(false);
  const [letterSentDate, setLetterSentDate] = useState("");

  function handleModal() {
    setVerifyingLetterSent(props.verifyingLetter_sent);
    setLetterExpired(props.letterExpired);
    setConfirmingLetter(props.confirmingLetter);
    setLetterSentDate(props.letterSentDate);
    setLetterExpiresDate(props.letter_expires_date);
  }

  function sendConfirmationCode(e) {
    props.sendConfirmationCode(e);
    closeConfirmationModal();
  }

  function closeConfirmationModal() {
    setVerifyingLetterSent(false);
  }

  function confirmLetterProofing(e) {
    props.confirmLetterProofing(e);
    closeNotificationModal();
  }

  function closeNotificationModal() {
    setLetterSentDate("");
    setConfirmingLetter(false);
    setLetterExpiresDate("");
  }

  function formatDateFromBackend(dateFromBackend) {
    let newDate = new Date(dateFromBackend);
    return (
      newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      newDate.getDate().toString().padStart(2, 0)
    );
  }

  const showNotificationModal = (letterSentDate === "" && confirmingLetter) || (letterExpired && letterSentDate !== "");
  const showConfirmationModal = !letterExpired && letterSentDate !== "" && !confirmingLetter && verifyingLetterSent;
  let description = "";
  if (props.disabled) {
    description = <div className="description">{translate("verify-identity.vetting_explanation_add_nin")}</div>;
  } else {
    if (props.letter_sent_date === "") {
      description = <div />;
    } else if (props.letter_expired) {
      description = (
        <>
          <div className="description">
            {translate("verify-identity.vetting_letter_code_expired")}
            <span id="letter_expires_date">{formatDateFromBackend(props.letter_expires_date)}</span>
          </div>
          <div className="description">{translate("verify-identity.vetting_letter_order_new_code")}</div>
        </>
      );
    } else {
      description = (
        <>
          <div className="description">
            {translate("verify-identity.vetting_letter_sent")}
            <span id="letter_sent_date">{formatDateFromBackend(props.letter_sent_date)}</span>
          </div>
          <div className="description">
            {translate("verify-identity.vetting_letter_valid")}
            <span id="letter_expires_date">{formatDateFromBackend(props.letter_expires_date)}</span>
          </div>
          <div className="description">{translate("verify-identity.vetting_letter_received")}</div>
        </>
      );
    }
  }

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "letter.placeholder",
    defaultMessage: "Letter confirmation code",
    description: "Placeholder for letter proofing text input",
  });

  return (
    <div>
      <div className="vetting-button">
        <button disabled={props.disabled} onClick={() => handleModal()}>
          <div className="text">
            {translate("verify-identity.vetting_post_tagline")}
            {description}
          </div>
          <div className="name">{translate("letter.button_text_request")}</div>
        </button>
      </div>
      <NotificationModal
        modalId="letterGenericConfirmDialog"
        title={translate("letter.modal_confirm_title")}
        mainText={translate("letter.modal_confirm_info")}
        showModal={showNotificationModal}
        closeModal={closeNotificationModal}
        acceptModal={confirmLetterProofing}
      />
      <ConfirmModal
        modalId="letterConfirmDialog"
        id="letterConfirmDialogControl"
        title={translate("letter.verify_title")}
        resendLabel={translate("cm.enter_code")}
        placeholder={placeholder}
        showModal={showConfirmationModal}
        closeModal={closeConfirmationModal}
        handleConfirm={sendConfirmationCode}
        with_resend_link={false}
        validationPattern={shortCodePattern}
        validationError={"confirmation.code_invalid_format"}
      />
    </div>
  );
}

LetterProofingButton.propTypes = {
  disabled: PropTypes.bool,
  confirmingLetter: PropTypes.bool,
  sendConfirmationCode: PropTypes.func,
  handleLetterProofing: PropTypes.func,
  confirmLetterProofing: PropTypes.func,
  handleStopConfirmationLetter: PropTypes.func,
};

export default LetterProofingButton;

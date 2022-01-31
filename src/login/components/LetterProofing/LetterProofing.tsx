import { translate } from "login/translation";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { shortCodePattern } from "../../app_utils/validation/regexPatterns";
import ConfirmModal from "../Modals/ConfirmModalContainer";
import NotificationModal from "../Modals/NotificationModal";
interface LetterProofingProps {
  letter_sent_date: string;
  letter_expired?: boolean;
  requestLetterAllowed?: boolean;
  letter_expires_date: string;
  sendConfirmationCode: any;
  confirmLetterProofing: any;
  disabled: any;
}

function LetterProofingButton(props: LetterProofingProps) {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  function handleModal() {
    const letterPending = props.letter_sent_date === "" && !props.letter_expired;
    const letterCodeExpired = props.letter_expired && props.letter_sent_date !== "";
    // Not request letter yet
    const letterNotRequested = props.letter_sent_date === "" && props.requestLetterAllowed;

    // Open Modal to request letter or verify code
    if (letterPending || letterNotRequested || letterCodeExpired) {
      return setShowNotificationModal(true), setShowConfirmationModal(false);
    } else {
      return setShowNotificationModal(false), setShowConfirmationModal(true);
    }
  }

  function sendConfirmationCode(e: React.MouseEvent<HTMLElement>) {
    props.sendConfirmationCode(e);
    setShowConfirmationModal(false);
  }

  function confirmLetterProofing(e: React.MouseEvent<HTMLElement>) {
    props.confirmLetterProofing(e);
    setShowNotificationModal(false);
  }

  function formatDateFromBackend(dateFromBackend: any) {
    const newDate = dateFromBackend && new Date(dateFromBackend);
    return (
      newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      newDate.getDate().toString().padStart(2, 0)
    );
  }

  let description = undefined;
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
        closeModal={() => setShowNotificationModal(false)}
        acceptModal={confirmLetterProofing}
      />
      <ConfirmModal
        modalId="letterConfirmDialog"
        id="letterConfirmDialogControl"
        title={translate("letter.verify_title")}
        resendLabel={translate("cm.enter_code")}
        placeholder={placeholder}
        showModal={showConfirmationModal}
        closeModal={() => setShowConfirmationModal(false)}
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

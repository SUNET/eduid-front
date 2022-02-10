import { FormattedMessage } from "react-intl";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { shortCodePattern } from "../login/app_utils/validation/regexPatterns";
import ConfirmModal from "../login/components/Modals/ConfirmModalContainer";
import NotificationModal from "../login/components/Modals/NotificationModal";
import { connect } from "react-redux";
import { isValid } from "redux-form";
import letterProofingSlice from "reducers/LetterProofing";
import { DashboardRootState } from "dashboard-init-app";
import { useDashboardAppDispatch } from "dashboard-hooks";
import { fetchLetterProofingState } from "apis/letterProofing";

interface LetterProofingProps {
  letter_sent_date: string;
  letter_expired?: boolean;
  requestLetterAllowed?: boolean;
  letter_expires_date: string;
  sendConfirmationCode: (e: React.MouseEvent<HTMLElement>) => void;
  confirmLetterProofing: () => void;
  disabled: boolean;
}
function LetterProofingButton(props: LetterProofingProps): JSX.Element {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const dispatch = useDashboardAppDispatch();

  useEffect(() => {
    dispatch(fetchLetterProofingState());
  }, [dispatch]);

  function handleModal() {
    const letterPending = props.letter_sent_date === undefined && !props.letter_expired;
    const letterCodeExpired = props.letter_expired && props.letter_sent_date !== undefined;
    // Not request letter yet
    const letterNotRequested = props.letter_sent_date === undefined && props.requestLetterAllowed;

    // Open Modal to request letter or verify code
    if (letterPending || letterNotRequested || letterCodeExpired) {
      return setShowNotificationModal(true), setShowConfirmationModal(false);
    } else {
      return setShowNotificationModal(false), setShowConfirmationModal(true);
    }
  }

  function sendConfirmationCode(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const codeValue = document.getElementById("confirmation-code-area");
    const data = {
      code: codeValue && (codeValue.querySelector("input") as HTMLInputElement).value.trim(),
    };
    dispatch(letterProofingSlice.actions.postLetterProofingVerificationCode(data));
    dispatch(letterProofingSlice.actions.stopLetterVerification());
    setShowConfirmationModal(false);
  }

  function confirmLetterProofing() {
    dispatch(fetchLetterProofingState());
    setShowNotificationModal(false);
  }

  function formatDateFromBackend(dateFromBackend: string) {
    const newDate: Date = new Date(dateFromBackend);
    return (
      newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      newDate.getDate().toString().padStart(2, "0")
    );
  }

  let description = null;
  if (props.disabled) {
    description = (
      <div className="description">
        <FormattedMessage
          defaultMessage="Start by adding your ID number above"
          description="explanation text for letter proofing"
        />
      </div>
    );
  } else {
    if (props.letter_sent_date === undefined) {
      description = <div />;
    } else if (props.letter_expired) {
      description = (
        <>
          <div className="description">
            <FormattedMessage defaultMessage="The code expired" description="explanation text for letter proofing" />
            <span id="letter_expires_date">{formatDateFromBackend(props.letter_expires_date)}</span>
          </div>
          <div className="description">
            <FormattedMessage
              defaultMessage="Click here to order a new code"
              description="explanation text for letter proofing"
            />
          </div>
        </>
      );
    } else {
      description = (
        <>
          <div className="description">
            <FormattedMessage defaultMessage="The letter was sent" description="explanation text for letter proofing" />
            <span id="letter_sent_date">{formatDateFromBackend(props.letter_sent_date)}</span>
          </div>
          <div className="description">
            <FormattedMessage
              defaultMessage="The letter is valid to"
              description="explanation text for letter proofing"
            />
            <span id="letter_expires_date">{formatDateFromBackend(props.letter_expires_date)}</span>
          </div>
          <div className="description">
            <FormattedMessage
              defaultMessage="Click here again when you have received the letter"
              description="explanation text for letter proofing"
            />
          </div>
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
            <FormattedMessage
              defaultMessage="For you registered at your current address"
              description="explanation text for letter proofing"
            />
            {description}
          </div>
          <div className="name">
            <FormattedMessage defaultMessage="by post" description="explanation text for letter proofing" />
          </div>
        </button>
      </div>
      <NotificationModal
        modalId="letterGenericConfirmDialog"
        title={
          <FormattedMessage
            defaultMessage="Use a confirmation code sent by post to your house"
            description="explanation text for letter proofing"
          />
        }
        mainText={
          <FormattedMessage
            defaultMessage="The letter will contain a code that you enter here to verify your identity. 
                            The code sent to you will expire in 2 weeks starting from now"
            description="explanation text for letter proofing"
          />
        }
        showModal={showNotificationModal}
        closeModal={() => setShowNotificationModal(false)}
        acceptModal={confirmLetterProofing}
      />
      <ConfirmModal
        modalId="letterConfirmDialog"
        id="letterConfirmDialogControl"
        title={
          <FormattedMessage
            defaultMessage="Add the code you have received by post"
            description="explanation text for letter proofing"
          />
        }
        resendLabel={
          <FormattedMessage defaultMessage="Confirmation code" description="explanation text for letter proofing" />
        }
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: DashboardRootState, props: any) => {
  const letterVerification = state.letter_proofing.confirmingLetter;
  const swedishNin = isValid("nins")(state);
  const requestLetterAllowed = (letterVerification && swedishNin) || state.letter_proofing.letter_expired;
  const disabled: boolean = props.disabled;
  return {
    disabled,
    requestLetterAllowed,
    verifyingLetter_sent: state.letter_proofing.verifyingLetter,
    letter_sent_date: state.letter_proofing.letter_sent,
    letter_expires_date: state.letter_proofing.letter_expires,
    letter_expired: state.letter_proofing.letter_expired,
  };
};

const LetterProofingContainer = connect(mapStateToProps, null)(LetterProofingButton);

export default LetterProofingContainer;

import { confirmLetterCode, fetchLetterProofingState, postRequestLetter } from "apis/eduidLetterProofing";
import { requestAllPersonalData } from "apis/eduidPersonalData";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { shortCodePattern } from "../login/app_utils/validation/regexPatterns";
import ConfirmModal from "../login/components/Modals/ConfirmModal";
import NotificationModal from "../login/components/Modals/NotificationModal";
import EduIDButton from "./EduIDButton";

export interface LetterProofingProps {
  disabled: boolean;
}

export default function LetterProofing(props: LetterProofingProps): JSX.Element {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const identities = useDashboardAppSelector((state) => state.identities);
  const letter_expired = useDashboardAppSelector((state) => state.letter_proofing.letter_expired);
  const letter_sent_date = useDashboardAppSelector((state) => state.letter_proofing.letter_sent);
  const letter_expires_date = useDashboardAppSelector((state) => state.letter_proofing.letter_expires);
  const disabled: boolean = props.disabled;
  const requestLetterAllowed = identities.nin?.number || letter_expired;
  const dispatch = useDashboardAppDispatch();

  useEffect(() => {
    dispatch(fetchLetterProofingState());
  }, [dispatch]);

  function handleModal() {
    const letterPending = letter_sent_date === undefined && !letter_expired;
    const letterCodeExpired = letter_expired && letter_sent_date !== undefined;
    // Not request letter yet
    const letterNotRequested = letter_sent_date === undefined && requestLetterAllowed;

    // Open Modal to request letter or verify code
    if (letterPending || letterNotRequested || letterCodeExpired) {
      return setShowNotificationModal(true), setShowConfirmationModal(false);
    } else {
      return setShowNotificationModal(false), setShowConfirmationModal(true);
    }
  }

  async function sendConfirmationCode(values: { [key: string]: string }) {
    const confirmationCode = values["letter-confirm-modal"];
    if (confirmationCode) {
      const response = await dispatch(confirmLetterCode({ code: confirmationCode.trim() }));
      if (confirmLetterCode.fulfilled.match(response)) {
        dispatch(requestAllPersonalData());
      }
    }
    setShowConfirmationModal(false);
  }

  async function confirmLetterProofing() {
    const response = await dispatch(postRequestLetter());
    if (postRequestLetter.fulfilled.match(response)) {
      dispatch(requestAllPersonalData());
    }
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
  if (disabled) {
    description = (
      <p className="description">
        <FormattedMessage
          defaultMessage="Start by adding your ID number above."
          description="explanation text for letter proofing"
        />
      </p>
    );
  } else {
    if (letter_sent_date === undefined) {
      description = <div />;
    } else if (letter_expired) {
      description = (
        <>
          <p className="description">
            <FormattedMessage defaultMessage="The code expired" description="explanation text for letter proofing" />
            <span id="letter_expires_date">&nbsp;{formatDateFromBackend(letter_expires_date as string)}</span>
          </p>
          <p className="description">
            <FormattedMessage
              defaultMessage="Click here to order a new code"
              description="explanation text for letter proofing"
            />
          </p>
        </>
      );
    } else {
      description = (
        <>
          <p className="description">
            <FormattedMessage defaultMessage="The letter was sent" description="explanation text for letter proofing" />
            <span id="letter_sent_date">&nbsp;{formatDateFromBackend(letter_sent_date)}</span>
          </p>
          <p className="description">
            <FormattedMessage
              defaultMessage="The letter is valid to"
              description="explanation text for letter proofing"
            />
            <span id="letter_expires_date">&nbsp;{formatDateFromBackend(letter_expires_date as string)}</span>
          </p>
          <p className="description">
            <FormattedMessage
              defaultMessage="When you have received the letter, proceed by clicking the button below."
              description="explanation text for letter proofing"
            />
          </p>
        </>
      );
    }
  }

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "letter.placeholder",
    defaultMessage: "Code",
    description: "Placeholder for letter proofing text input",
  });

  return (
    <>
      <p className="proofing-btn-help">
        <FormattedMessage
          description="letter initialize proofing help text"
          defaultMessage={`You will receive a letter which contains a code that for security reasons expires in two weeks.`}
        />
      </p>

      {description}

      <EduIDButton disabled={disabled} buttonstyle="primary" size="sm" onClick={() => handleModal()}>
        <FormattedMessage defaultMessage="Proceed" description="button proceed" />
      </EduIDButton>

      <NotificationModal
        id="letter-confirm-modal"
        title={
          <FormattedMessage
            defaultMessage="Use a code sent by post to your address"
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
        acceptButtonText={<FormattedMessage defaultMessage="Accept" description="accept button" />}
      />
      <ConfirmModal
        id="letter-confirm-modal"
        title={
          <FormattedMessage
            defaultMessage="Add the code you have received by post"
            description="explanation text for letter proofing"
          />
        }
        placeholder={placeholder}
        showModal={showConfirmationModal}
        closeModal={() => setShowConfirmationModal(false)}
        handleConfirm={sendConfirmationCode}
        modalFormLabel={<FormattedMessage defaultMessage="Code" description="letter proofing modal form label" />}
        validationError={"confirmation.code_invalid_format"}
        validationPattern={shortCodePattern}
      />
    </>
  );
}

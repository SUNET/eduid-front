import { FormattedMessage } from "react-intl";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { shortCodePattern } from "../login/app_utils/validation/regexPatterns";
import ConfirmModal from "../login/components/Modals/ConfirmModal";
import NotificationModal from "../login/components/Modals/NotificationModal";
import { isValid } from "redux-form";
import { useDashboardAppDispatch } from "dashboard-hooks";
import { fetchLetterProofingState, postRequestLetter, confirmLetterCode } from "apis/eduidLetterProofing";
import { useDashboardAppSelector } from "dashboard-hooks";

export interface LetterProofingProps {
  disabled: boolean;
}

export default function LetterProofingButton(props: LetterProofingProps): JSX.Element {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const nins = useDashboardAppSelector((state) => state.nins);
  const letter_expired = useDashboardAppSelector((state) => state.letter_proofing.letter_expired);
  const letter_sent_date = useDashboardAppSelector((state) => state.letter_proofing.letter_sent);
  const letter_expires_date = useDashboardAppSelector((state) => state.letter_proofing.letter_expires);
  const disabled: boolean = props.disabled;
  const swedishNin = isValid("nins")(nins);
  const requestLetterAllowed = swedishNin || letter_expired;
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

  function sendConfirmationCode(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const codeValue = document.getElementById("confirmation-code-area");
    const data = {
      code: codeValue && (codeValue.querySelector("input") as HTMLInputElement).value.trim(),
    };
    if (data.code) {
      dispatch(confirmLetterCode({ code: data.code }));
    }
    setShowConfirmationModal(false);
  }

  function confirmLetterProofing() {
    dispatch(postRequestLetter());
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
      <div className="description">
        <FormattedMessage
          defaultMessage="Start by adding your ID number above"
          description="explanation text for letter proofing"
        />
      </div>
    );
  } else {
    if (letter_sent_date === undefined) {
      description = <div />;
    } else if (letter_expired) {
      description = (
        <>
          <div className="description">
            <FormattedMessage defaultMessage="The code expired" description="explanation text for letter proofing" />
            <span id="letter_expires_date">{formatDateFromBackend(letter_expires_date as string)}</span>
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
            <span id="letter_sent_date">{formatDateFromBackend(letter_sent_date)}</span>
          </div>
          <div className="description">
            <FormattedMessage
              defaultMessage="The letter is valid to"
              description="explanation text for letter proofing"
            />
            <span id="letter_expires_date">{formatDateFromBackend(letter_expires_date as string)}</span>
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
        <button disabled={disabled} onClick={() => handleModal()}>
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
      <p className={"proofing-btn-help" + (disabled === true ? " disabled" : "")}>
        <FormattedMessage
          description="letter initialize proofing help text"
          defaultMessage={`The letter will contain a code that for security reasons expires in two weeks.`}
        />
      </p>
      <NotificationModal
        id="letter-confirm-modal"
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
        modalFormLabel={
          <FormattedMessage defaultMessage="Confirmation code" description="explanation text for letter proofing" />
        }
        validationError={"confirmation.code_invalid_format"}
        validationPattern={shortCodePattern}
      />
    </div>
  );
}

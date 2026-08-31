import { letterProofingApi } from "apis/eduidLetterProofing";
import { personalDataApi } from "apis/eduidPersonalData";
import { ConfirmModal } from "components/Common/ConfirmModal";
import { EduIDButton } from "components/Common/EduIDButton";
import { NotificationModal } from "components/Common/NotificationModal";
import { useAppSelector } from "eduid-hooks";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { shortCodePattern } from "../../helperFunctions/validation/regexPatterns";
import { AddNin } from "./AddNin";

export interface LetterProofingProps {
  disabled: boolean;
}

function formatDateFromBackend(dateFromBackend: string) {
  return new Intl.DateTimeFormat("sv-SE").format(new Date(dateFromBackend));
}

type ModalState = "notification" | "confirmation" | null;

export function LetterProofing({ disabled }: Readonly<LetterProofingProps>) {
  const [modalState, setModalState] = useState<ModalState>(null);
  const identities = useAppSelector((state) => state.personal_data.response?.identities);
  const letter_expired = useAppSelector((state) => state.letter_proofing.letter_expired);
  const letter_sent_date = useAppSelector((state) => state.letter_proofing.letter_sent);
  const letter_expires_date = useAppSelector((state) => state.letter_proofing.letter_expires);
  const [requestAllPersonalData] = personalDataApi.useLazyRequestAllPersonalDataQuery();
  const [letterProofingState] = letterProofingApi.useLazyLetterProofingStateQuery();
  const [requestLetter] = letterProofingApi.useLazyRequestLetterQuery();
  const [confirmLetterCode] = letterProofingApi.useLazyConfirmLetterCodeQuery();

  useEffect(() => {
    letterProofingState();
  }, [letterProofingState]);

  function handleModal() {
    const shouldRequestLetter = letter_sent_date === undefined || letter_expired;
    setModalState(shouldRequestLetter ? "notification" : "confirmation");
  }
  async function sendConfirmationCode(values: { [key: string]: string }) {
    const confirmationCode = values["letter-confirm-modal"];
    if (confirmationCode) {
      const response = await confirmLetterCode({ code: confirmationCode.trim() });
      if (response.isSuccess) {
        requestAllPersonalData();
      }
    }
    setModalState(null);
  }

  async function confirmLetterProofing() {
    if (identities?.nin?.number) {
      const response = await requestLetter({ nin: identities.nin.number });
      if (response.isSuccess) {
        requestAllPersonalData();
      }
    }
    setModalState(null);
  }

  let description = null;
  if (disabled) {
    description = (
      <p className="description">
        <FormattedMessage
          id="letterProofing.startHint"
          defaultMessage="Start by adding your ID number above."
          description="explanation text for letter proofing"
        />
      </p>
    );
  } else if (letter_sent_date === undefined) {
    description = <div />;
  } else if (letter_expired) {
    description = (
      <>
        <p className="description">
          <FormattedMessage
            id="letterProofing.expired"
            defaultMessage="The code expired"
            description="explanation text for letter proofing"
          />
          <span id="letter_expires_date">&nbsp;{formatDateFromBackend(letter_expires_date as string)}</span>
        </p>
        <p className="description">
          <FormattedMessage
            id="letterProofing.requestNew"
            defaultMessage="To request a new code, proceed by clicking the button below."
            description="explanation text for letter proofing"
          />
        </p>
      </>
    );
  } else {
    description = (
      <>
        <p className="description">
          <FormattedMessage
            id="letterProofing.sent"
            defaultMessage="The letter was sent"
            description="explanation text for letter proofing"
          />
          <span id="letter_sent_date">&nbsp;{formatDateFromBackend(letter_sent_date)}</span>
        </p>
        <p className="description">
          <FormattedMessage
            id="letterProofing.validTo"
            defaultMessage="The letter is valid to"
            description="explanation text for letter proofing"
          />
          <span id="letter_expires_date">&nbsp;{formatDateFromBackend(letter_expires_date as string)}</span>
        </p>
        <p className="description">
          <FormattedMessage
            id="letterProofing.whenReceived"
            defaultMessage="When you have received the letter, proceed by clicking the button below."
            description="explanation text for letter proofing"
          />
        </p>
      </>
    );
  }

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "common.enterCodePlaceholder",
    defaultMessage: "enter code",
    description: "Placeholder for letter proofing text input",
  });

  return (
    <>
      <p>
        <FormattedMessage
          id="letterProofing.initialize"
          description="letter initialize proofing help text"
          defaultMessage="You will receive a letter which contains a code that for security reasons expires in two weeks."
        />
      </p>

      <AddNin />

      <hr className="border-line border-line-lesser" />

      {description}

      <EduIDButton
        disabled={disabled}
        buttonstyle="primary sm"
        onClick={handleModal}
        aria-label="Proceed with letter proofing"
      >
        <FormattedMessage id="letterProofing.proceedButton" defaultMessage="Proceed" description="button proceed" />
      </EduIDButton>

      <NotificationModal
        id="letter-confirm-modal"
        title={
          <FormattedMessage
            id="letterProofing.useCode"
            defaultMessage="Use a code sent by post to your address"
            description="explanation text for letter proofing"
          />
        }
        mainText={
          <FormattedMessage
            id="letterProofing.codeInfo"
            defaultMessage="The letter will contain a code that you enter here to verify your identity. The code sent to you will expire in 2 weeks starting from now"
            description="explanation text for letter proofing"
          />
        }
        showModal={modalState === "notification"}
        closeModal={() => setModalState(null)}
        acceptModal={confirmLetterProofing}
        acceptButtonText={
          <FormattedMessage id="letterProofing.button" defaultMessage="Accept" description="accept button" />
        }
      />
      <ConfirmModal
        id="letter-confirm-modal"
        title={
          <FormattedMessage
            id="letterProofing.addCode"
            defaultMessage="Add the code you have received by post"
            description="explanation text for letter proofing"
          />
        }
        placeholder={placeholder}
        showModal={modalState === "confirmation"}
        closeModal={() => setModalState(null)}
        handleConfirm={sendConfirmationCode}
        modalFormLabel={
          <FormattedMessage id="common.code" defaultMessage="Code" description="letter proofing modal form label" />
        }
        validationError="confirmation.code_invalid_format"
        validationPattern={shortCodePattern}
      />
    </>
  );
}

import ConfirmModal from "components/Common/ConfirmModal";
import { securityKeyPattern } from "helperFunctions/validation/regexPatterns";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface WebauthnDescriptionModalProps {
  showModal: boolean;
  closeModal: () => void;
  handleConfirm: (values: { [key: string]: string }) => void;
}

export function WebauthnDescriptionModal({
  showModal,
  closeModal,
  handleConfirm,
}: Readonly<WebauthnDescriptionModalProps>): React.ReactElement {
  const intl = useIntl();

  const placeholder = intl.formatMessage({
    id: "security.placeholder",
    defaultMessage: "describe your security key",
    description: "placeholder text for security key description input",
  });

  return (
    <ConfirmModal
      id="describe-webauthn-token-modal"
      title={
        <FormattedMessage
          description="security webauthn describe title"
          defaultMessage="Add a name for your security key"
        />
      }
      mainText={
        <p>
          <FormattedMessage
            description="security webauthn describe paragraph"
            defaultMessage={`Note: this is only for your own use to be able to distinguish between your added keys.`}
          />
        </p>
      }
      placeholder={placeholder}
      showModal={showModal}
      closeModal={closeModal}
      handleConfirm={handleConfirm}
      modalFormLabel={
        <FormattedMessage description="security webauthn credential type" defaultMessage="Security key" />
      }
      validationPattern={securityKeyPattern}
      validationError="security.description_invalid_format"
      helpBlock={
        <FormattedMessage defaultMessage="max 50 characters" description="Help text for security key max length" />
      }
    />
  );
}

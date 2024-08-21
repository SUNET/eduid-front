import { postDeleteAccount } from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import NotificationModal from "components/Common/NotificationModal";
import { useAppDispatch } from "eduid-hooks";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { AuthenticateModal } from "./Authenticate";

export default function DeleteAccount(): JSX.Element | null {
  const [showModal, setShowModal] = useState(false);
  const [showAuthnModal, setShowAuthnModal] = useState(false);
  const dispatch = useAppDispatch();

  async function handleConfirmationDeletion() {
    setShowModal(false);
    const response = await dispatch(postDeleteAccount());
    if (postDeleteAccount.fulfilled.match(response)) {
      window.location.assign(response.payload.location);
    } else if ((response.payload as any)?.payload.message === "authn_status.must-authenticate") {
      setShowAuthnModal(true);
    }
  }

  return (
    <article id="delete-account-container">
      <h2>
        <FormattedMessage defaultMessage="Delete eduID" description="DeleteAccount" />
      </h2>
      <p>
        <FormattedMessage
          defaultMessage="Click the link to permanently delete your eduID."
          description="DeleteAccount"
        />
      </p>
      <EduIDButton buttonstyle="link" className="lowercase" id="delete-button" onClick={() => setShowModal(true)}>
        <FormattedMessage defaultMessage="Delete eduID" description="DeleteAccount" />
      </EduIDButton>
      <AuthenticateModal
        action="terminateAccountAuthn"
        dispatch={dispatch}
        showModal={showAuthnModal}
        setShowModal={setShowAuthnModal}
      />
      <NotificationModal
        id="delete-account-modal"
        title={
          <FormattedMessage
            defaultMessage="Are you sure you want to delete your eduID?"
            description="settings.modal_delete_title"
          />
        }
        mainText={
          <FormattedMessage
            defaultMessage={`Deleting your eduID will permanently remove all your saved
              information. If it has been a long time since you last logged in, you may need to log in again.`}
            description="delete.modal_info"
          />
        }
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        acceptModal={handleConfirmationDeletion}
        acceptButtonText={<FormattedMessage defaultMessage="Delete my eduID" description="delete.confirm_button" />}
      />
    </article>
  );
}

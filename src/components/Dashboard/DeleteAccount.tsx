import securityApi from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import NotificationModal from "components/Common/NotificationModal";
import { ToolTip } from "components/Common/ToolTip";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

export default function DeleteAccount(): React.JSX.Element | null {
  const [showModal, setShowModal] = useState(false);
  const [postDeleteAccount] = securityApi.useLazyPostDeleteAccountQuery();

  async function handleConfirmationDeletion() {
    setShowModal(false);
    const response = await postDeleteAccount();
    if (response.isSuccess) {
      globalThis.location.assign(response.data.payload.location);
    }
  }

  return (
    <article id="delete-account">
      <div className="flex-between baseline">
        <h2>
          <FormattedMessage
            id="deleteAccount.block"
            defaultMessage="Block and delete eduID"
            description="DeleteAccount"
          />
        </h2>
        <ToolTip />
      </div>
      <p>
        <FormattedMessage
          id="deleteAccount.link"
          defaultMessage="Click the link to delete your eduID. It will block any access to the account unless you change your password within one week, after which it will be removed permanently."
          description="DeleteAccount"
        />
      </p>
      <EduIDButton buttonstyle="link normal-case" id="delete-button" onClick={() => setShowModal(true)}>
        <FormattedMessage id="deleteAccount.delete" defaultMessage="Delete eduID" description="DeleteAccount" />
      </EduIDButton>
      <NotificationModal
        id="delete-account-modal"
        title={
          <FormattedMessage
            id="deleteAccount.title"
            defaultMessage="Are you sure you want to delete your eduID?"
            description="settings.modal_delete_title"
          />
        }
        mainText={
          <FormattedMessage
            id="deleteAccount.info"
            defaultMessage="Deleting your eduID will permanently remove all your saved information. If it has been a long time since you last logged in, you may need to log in again."
            description="delete.modal_info"
          />
        }
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        acceptModal={handleConfirmationDeletion}
        acceptButtonText={
          <FormattedMessage
            id="deleteAccount.button"
            defaultMessage="Delete my eduID"
            description="delete.confirm_button"
          />
        }
      />
    </article>
  );
}

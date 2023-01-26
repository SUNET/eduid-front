import { postDeleteAccount } from "apis/eduidSecurity";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch } from "dashboard-hooks";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "reducers/Notifications";
import NotificationModal from "../login/components/Modals/NotificationModal";

export default function DeleteAccount(): JSX.Element | null {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDashboardAppDispatch();

  function handleStartConfirmationDeletion() {
    dispatch(clearNotifications());
    setShowModal(true);
  }

  function handleStopConfirmationDeletion() {
    setShowModal(false);
  }

  async function handleConfirmationDeletion() {
    setShowModal(false);
    const response = await dispatch(postDeleteAccount());
    if (postDeleteAccount.fulfilled.match(response)) {
      window.location.assign(response.payload.location);
    }
  }

  return (
    <article id="delete-account-container">
      <section className="intro">
        <h2>
          <FormattedMessage defaultMessage="Delete eduID" description="DeleteAccount" />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="Click the link to permanently delete your eduID."
            description="DeleteAccount"
          />
        </p>
      </section>
      <EduIDButton
        buttonstyle="link"
        className="lowercase"
        id="delete-button"
        onClick={handleStartConfirmationDeletion}
      >
        <FormattedMessage defaultMessage="Delete eduID" description="DeleteAccount" />
      </EduIDButton>

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
              information. After clicking the button you need to use your log in details one final time.`}
            description="delete.modal_info"
          />
        }
        showModal={showModal}
        closeModal={handleStopConfirmationDeletion}
        acceptModal={handleConfirmationDeletion}
        acceptButtonText={<FormattedMessage defaultMessage="Delete my eduID" description="delete.confirm_button" />}
      />
    </article>
  );
}

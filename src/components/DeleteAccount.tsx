import { confirmDeletion } from "actions/Security";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "reducers/Notifications";
import NotificationModal from "../login/components/Modals/NotificationModal";

export default function DeleteAccount(): JSX.Element | null {
  const [showModal, setShowModal] = useState(false);
  const deleted = useDashboardAppSelector((state) => state.security.deleted);
  const redirect_to = useDashboardAppSelector((state) => state.security.location);
  const dispatch = useDashboardAppDispatch();

  function handleStartConfirmationDeletion() {
    dispatch(clearNotifications());
    setShowModal(true);
  }

  function handleStopConfirmationDeletion() {
    setShowModal(false);
  }

  function handleConfirmationDeletion() {
    dispatch(confirmDeletion());
    setShowModal(false);
  }

  if (redirect_to !== "") {
    window.location.href = redirect_to;
    return null;
  }
  if (deleted) {
    window.location.href = "https://eduid.se";
    return null;
  }

  return (
    <article id="delete-account-container">
      <div className="intro">
        <h3>
          <FormattedMessage defaultMessage="Delete eduID" description="DeleteAccount" />
        </h3>
        <p>
          <FormattedMessage
            defaultMessage="Click the link to permanently delete your eduID."
            description="DeleteAccount"
          />
        </p>
      </div>
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

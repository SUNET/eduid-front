import { postDeleteAccount } from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch } from "eduid-hooks";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { AuthenticateModal } from "./Authenticate";

export default function DeleteAccount(): JSX.Element | null {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  async function handleConfirmationDeletion() {
    setShowModal(false);
    const response = await dispatch(postDeleteAccount());
    if (postDeleteAccount.fulfilled.match(response)) {
      window.location.assign(response.payload.location);
    } else if ((response.payload as any)?.payload.message === "authn_status.must-authenticate") {
      dispatch(clearNotifications());
      setShowModal(true);
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
      <EduIDButton buttonstyle="link" className="lowercase" id="delete-button" onClick={handleConfirmationDeletion}>
        <FormattedMessage defaultMessage="Delete eduID" description="DeleteAccount" />
      </EduIDButton>
      <AuthenticateModal
        action="terminateAccountAuthn"
        dispatch={dispatch}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </article>
  );
}

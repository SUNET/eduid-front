import { postDeleteAccount } from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch } from "eduid-hooks";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
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
        mainText={
          <FormattedMessage
            defaultMessage={`Deleting your eduID will permanently remove all your saved information. After clicking the 
              button you need to use your log in details one final time.`}
            description="Dashboard delete account modal main text"
          />
        }
      />
    </article>
  );
}

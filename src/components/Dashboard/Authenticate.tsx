import { authenticate } from "apis/eduidAuthn";
import NotificationModal from "components/Common/NotificationModal";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";

export async function handleAuthenticate(props: { action: string; dispatch: any }) {
  const response = await props.dispatch(authenticate({ frontend_action: props.action }));
  if (authenticate.fulfilled.match(response)) {
    window.location.href = response?.payload.location;
  }
}

export function AuthenticateModal(props: {
  action: string;
  dispatch: any;
  setShowModal: any;
  showModal: boolean;
  mainText?: React.ReactNode;
}) {
  async function handleAuthenticate() {
    props.setShowModal(false);
    props.dispatch(clearNotifications());
    const response = await props.dispatch(authenticate({ frontend_action: props.action }));
    if (authenticate.fulfilled.match(response)) {
      window.location.href = response?.payload.location;
    }
  }

  return (
    <NotificationModal
      id="security-confirm-modal"
      title={
        <FormattedMessage
          defaultMessage="For security reasons..."
          description="Dashboard change password modal title"
        />
      }
      mainText={props.mainText}
      showModal={props.showModal}
      closeModal={() => {
        props.setShowModal(false);
      }}
      acceptModal={handleAuthenticate}
      acceptButtonText={<FormattedMessage defaultMessage="Accept" description="accept button" />}
    />
  );
}

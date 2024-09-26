import { authenticate } from "apis/eduidAuthn";
import NotificationModal from "components/Common/NotificationModal";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import securitySlice from "slices/Security";

export async function handleAuthenticate(props: { action: string; dispatch: any }) {
  const response = await props.dispatch(authenticate({ frontend_action: props.action }));
  if (authenticate.fulfilled.match(response)) {
    window.location.href = response?.payload.location;
  }
}

export function AuthenticateModal(
  props: Readonly<{
    action: string;
    state?: string;
    dispatch: any;
    // setShowModal: any;
    // showModal: boolean;
  }>
) {
  const dispatch = useAppDispatch();
  const re_authenticate = useAppSelector((state) => state.security.re_authenticate);

  async function handleAuthenticate() {
    // props.setShowModal(false);
    dispatch(securitySlice.actions.setReAuthenticate(false));
    props.dispatch(clearNotifications());
    const response = await props.dispatch(authenticate({ frontend_action: props.action, frontend_state: props.state }));
    if (authenticate.fulfilled.match(response)) {
      window.location.href = response?.payload.location;
    }
  }

  return (
    <NotificationModal
      id="security-confirm-modal"
      title={<FormattedMessage defaultMessage="Security check" description="Dashboard change password modal title" />}
      mainText={
        <FormattedMessage
          description="security zone modal"
          defaultMessage="You need to log in again to perform the requested action."
        />
      }
      showModal={re_authenticate || false}
      closeModal={() => {
        dispatch(securitySlice.actions.setReAuthenticate(false));
      }}
      acceptModal={handleAuthenticate}
      acceptButtonText={<FormattedMessage defaultMessage="Continue" description="continue button" />}
    />
  );
}

import { authenticate } from "apis/eduidAuthn";
import NotificationModal from "components/Common/NotificationModal";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import securityZoneSlice from "slices/SecurityZone";

// export async function handleAuthenticate(props: { action: string; dispatch: any }) {
//   const response = await props.dispatch(authenticate({ frontend_action: props.action }));
//   if (authenticate.fulfilled.match(response)) {
//     window.location.href = response?.payload.location;
//   }
// }

export function AuthenticateModal(
  props: Readonly<{
    //action: string;
    frontend_state?: string;
    // dispatch: any;
    // setShowModal: any;
    // showModal: boolean;
  }>
) {
  const dispatch = useAppDispatch();
  const re_authenticate = useAppSelector((state) => state.securityZone.re_authenticate);
  const frontend_action = useAppSelector((state) => state.securityZone.frontend_action);

  async function handleAuthenticate() {
    // props.setShowModal(false);
    dispatch(securityZoneSlice.actions.setReAuthenticate(false));
    dispatch(clearNotifications());
    const response = await dispatch(
      authenticate({ frontend_action: frontend_action, frontend_state: props.frontend_state })
    );
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
        dispatch(securityZoneSlice.actions.setReAuthenticate(false));
      }}
      acceptModal={handleAuthenticate}
      acceptButtonText={<FormattedMessage defaultMessage="Continue" description="continue button" />}
    />
  );
}

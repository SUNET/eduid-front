import { authenticate } from "apis/eduidAuthn";

export async function handleAuthenticate(props: { action: string; dispatch: any }) {
  const response = await props.dispatch(authenticate({ frontend_action: props.action }));
  if (authenticate.fulfilled.match(response)) {
    window.location.href = response?.payload.location;
  }
}

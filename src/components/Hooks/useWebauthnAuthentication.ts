import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import { useCallback, useState } from "react";

interface UseWebauthnAuthenticationArgs {
  /** Fetch the challenge (WebAuthn request options) from the backend */
  setup(): Promise<PublicKeyCredentialRequestOptionsJSON | undefined>;
  /** Called with the credential after a successful navigator.credentials.get() */
  onSuccess(publicKeyCredential: AuthenticationResponseJSON): Promise<void> | void;
  /** Called when the attempt is over, whatever the outcome */
  onComplete?(): void;
}

/**
 * Shared flow for the "log in with passkey" and "use security key" buttons: fetch a challenge,
 * ask the browser for a credential, hand it to the caller, and always leave the active state.
 *
 * `active` is true from the click until the attempt is over; the UI can show an animation or disable the button.
 */
export function useWebauthnAuthentication({ setup, onSuccess, onComplete }: Readonly<UseWebauthnAuthenticationArgs>) {
  const [active, setActive] = useState(false);
  const [performAuthentication] = navigatorCredentialsApi.useLazyPerformAuthenticationQuery();

  const start = useCallback(async () => {
    setActive(true);
    try {
      const webauth_options = await setup();
      if (webauth_options) {
        const response = await performAuthentication({ webauth_options });
        if (response.isSuccess) {
          // Wait for credential submission to finish before calling onComplete, so that a caller restarting
          // conditional auth in onComplete doesn't fetch a new challenge while the backend is still
          // processing this credential.
          await onSuccess(response.data);
        }
      }
    } catch {
      // Credential errors are reported by the navigatorCredentials API layer; an exception from setup() or
      // onSuccess() must not escape the click handler as an unhandled rejection.
    } finally {
      setActive(false);
      onComplete?.();
    }
  }, [setup, performAuthentication, onSuccess, onComplete]);

  return { active, start };
}

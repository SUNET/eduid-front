import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import { PublicKeyCredentialHint } from "helperFunctions/webauthnHints";
import { useCallback, useState } from "react";

interface UseWebauthnAuthenticationArgs {
  /** Fetch the challenge (WebAuthn request options) from the backend */
  setup(): Promise<PublicKeyCredentialRequestOptionsJSON | undefined>;
  /**
   * Called with the credential after a successful navigator.credentials.get().
   * Return true when the login finished, so onComplete is not called.
   */
  onSuccess(publicKeyCredential: AuthenticationResponseJSON): Promise<boolean | void> | boolean | void;
  /** Called when the attempt is over, whatever the outcome (unless onSuccess returned true) */
  onComplete?(): void;
  /**
   * Which kind of authenticator the browser should offer first (WebAuthn `hints`, in order of preference).
   * Both buttons share one challenge from the backend, so each sets its own. A hint only orders the options:
   * nothing is ruled out (a passkey can live on a security key), and browsers that do not support `hints`
   * ignore them.
   */
  hints?: PublicKeyCredentialHint[];
}

/**
 * Shared flow for the "log in with passkey" and "use security key" buttons: fetch a challenge,
 * ask the browser for a credential, hand it to the caller, and always leave the active state.
 *
 * `active` is true from the click until the attempt is over; the UI can show an animation or disable the button.
 */
export function useWebauthnAuthentication({
  setup,
  onSuccess,
  onComplete,
  hints,
}: Readonly<UseWebauthnAuthenticationArgs>) {
  const [active, setActive] = useState(false);
  const [performAuthentication] = navigatorCredentialsApi.useLazyPerformAuthenticationQuery();

  const start = useCallback(async () => {
    setActive(true);
    let finished = false;
    try {
      const webauth_options = await setup();
      if (webauth_options) {
        const response = await performAuthentication({
          webauth_options: hints ? { ...webauth_options, hints } : webauth_options,
        });
        if (response.isSuccess) {
          // Wait for credential submission to finish before calling onComplete, so that a caller restarting
          // conditional auth in onComplete doesn't fetch a new challenge while the backend is still
          // processing this credential.
          finished = (await onSuccess(response.data)) === true;
        }
      }
    } catch {
      // Credential errors are reported by the navigatorCredentials API layer; an exception from setup() or
      // onSuccess() must not escape the click handler as an unhandled rejection.
    } finally {
      setActive(false);
      // Restarting after a completed login would POST a new challenge while /next is in flight
      if (!finished) onComplete?.();
    }
  }, [setup, performAuthentication, onSuccess, onComplete, hints]);

  return { active, start };
}

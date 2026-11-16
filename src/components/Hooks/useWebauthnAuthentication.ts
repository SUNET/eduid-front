import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import { useCallback, useState } from "react";

interface UseWebauthnAuthenticationArgs {
  /** Fetch the challenge (WebAuthn request options) from the backend */
  setup(): Promise<PublicKeyCredentialRequestOptionsJSON | undefined>;
  /** Called with the credential after a successful navigator.credentials.get() */
  onSuccess(publicKeyCredential: AuthenticationResponseJSON): Promise<void> | void;
  /** Called when the attempt is over, whatever the outcome */
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
 * WebAuthn `hints` (Level 3), in the order of what a login button wants the browser to show first:
 * - `security-key`: a roaming hardware key (USB, NFC or Bluetooth)
 * - `client-device`: an authenticator on this device: the platform authenticator (Touch ID, Windows Hello) and the
 *   passkey provider of the browser or OS (iCloud Keychain, Google Password Manager)
 * - `hybrid`: another device, a phone or tablet, reached with a QR code or Bluetooth
 *
 * A hint is a preference for the browser's own dialog. It excludes nothing, so a passkey on a security key can
 * still be used from the passkey button. Browsers that do not support hints ignore them. A password manager
 * browser extension that takes over `navigator.credentials.get()` shows its own UI and may ignore them too.
 */
export type PublicKeyCredentialHint = "security-key" | "client-device" | "hybrid";

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
  }, [setup, performAuthentication, onSuccess, onComplete, hints]);

  return { active, start };
}

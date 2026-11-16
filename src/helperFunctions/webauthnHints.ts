/**
 * WebAuthn `hints` (Level 3), in the order of what a button wants the browser to show first:
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

// The "use security key" button: prefer the security key option
export const SECURITY_KEY_HINTS: PublicKeyCredentialHint[] = ["security-key"];

// The "passkey" / "this device" button: prefer this device (its platform authenticator or passkey provider, which
// includes the browser's and OS's password manager) and then a phone or tablet
export const PASSKEY_HINTS: PublicKeyCredentialHint[] = ["client-device", "hybrid"];

/**
 * The hints for a button, from the authenticator attachment that button asks the backend for:
 * `cross-platform` is the security key button, `platform` the "this device" button.
 */
export function hintsForAttachment(authenticator: string | undefined): PublicKeyCredentialHint[] | undefined {
  switch (authenticator) {
    case "cross-platform":
      return SECURITY_KEY_HINTS;
    case "platform":
      return PASSKEY_HINTS;
    default:
      return undefined;
  }
}

/**
 * Add the hints of the button to registration options. The backend still sends `authenticatorAttachment`, which is
 * a hard filter; the hints only order what the browser shows. Hints that the backend has set are kept.
 *
 * Whether a hint can offer something the attachment excludes (`hybrid`, a phone, for the `platform` button) depends on
 * the browser: WebAuthn Level 3 lets hints take precedence over the attachment, but not every browser does that. It
 * does no harm either way, and it is what the login button asks for.
 */
export function withRegistrationHints(
  options: PublicKeyCredentialCreationOptionsJSON,
  authenticator: string | undefined,
): PublicKeyCredentialCreationOptionsJSON {
  const hints = hintsForAttachment(authenticator);
  if (!hints || options.hints) return options;
  return { ...options, hints: [...hints] };
}

import { CredentialType } from "apis/eduidSecurity";
import { describeCredential } from "helperFunctions/credentialDescriptor";
import { defineMessages, IntlShape } from "react-intl";

const MESSAGES = defineMessages({
  securityKey: {
    id: "securityKeyTable.type.securityKey",
    defaultMessage: "Security key",
    description: "type of a credential that is a security key",
  },
  passkey: {
    id: "securityKeyTable.type.passkey",
    defaultMessage: "Passkey",
    description: "type of a credential that is a passkey",
  },
  passkeyOnSecurityKey: {
    id: "securityKeyTable.type.passkeyOnSecurityKey",
    defaultMessage: "Passkey on a security key",
    description: "type of a security key that is known to hold a passkey",
  },
  unknown: {
    id: "securityKeyTable.type.unknown",
    defaultMessage: "Security key or passkey",
    description: "type of a credential that cannot be told apart",
  },
  secondFactorOnly: {
    id: "securityKeyTable.discoverable.no",
    defaultMessage: "second factor only",
    description: "a security key that cannot log in without a username, only as a second step",
  },
  mayWorkWithoutUsername: {
    id: "securityKeyTable.discoverable.likely",
    defaultMessage: "may work without a username",
    description: "a security key that probably holds a passkey, not known for sure",
  },
});

export type KeyTypeKind = "security_key" | "passkey" | "unknown";

export interface KeyTypeInfo {
  kind: KeyTypeKind;
  /** The type on its own, for example "Security key" or "Passkey" */
  label: string;
  /** The type and what else is known, for example "Security key · YubiKey 5 NFC · second factor only" */
  line: string;
}

const SEPARATOR = " · ";

/**
 * What to tell the user about the type of a security key or passkey, from the codes the backend sends.
 *
 * The words follow the strength of the evidence: `yes` is stated ("Passkey on a security key"), `likely` is hedged
 * ("may work without a username"), `no` says only "second factor only", and an unknown says nothing about it. A name
 * (from MDS, the provider table or the Apple attestation format) is added when there is one, as it is, since names
 * are not translated.
 *
 * Returns undefined when the backend did not send the type at all (an older backend, or a credential that is not a key),
 * so that the table looks as it did.
 */
export function describeKeyType(intl: IntlShape, credential: CredentialType): KeyTypeInfo | undefined {
  if (!credential.kind) return undefined;
  const descriptor = describeCredential(credential);

  let label: string;
  let suffix: string | undefined;
  if (descriptor.kind === "security_key") {
    if (descriptor.discoverable === "yes") {
      label = intl.formatMessage(MESSAGES.passkeyOnSecurityKey);
    } else {
      label = intl.formatMessage(MESSAGES.securityKey);
      if (descriptor.discoverable === "no") suffix = intl.formatMessage(MESSAGES.secondFactorOnly);
      if (descriptor.discoverable === "likely") suffix = intl.formatMessage(MESSAGES.mayWorkWithoutUsername);
    }
  } else if (descriptor.kind === "passkey") {
    label = intl.formatMessage(MESSAGES.passkey);
  } else {
    label = intl.formatMessage(MESSAGES.unknown);
  }

  const line = [label, descriptor.name, suffix].filter(Boolean).join(SEPARATOR);
  return { kind: descriptor.kind, label, line };
}

/** The label of a credential's type when the backend did not send one: from the attachment that was requested. */
export function fallbackKeyTypeLabel(intl: IntlShape, credential: CredentialType): string {
  return credential.authenticator === "cross-platform"
    ? intl.formatMessage(MESSAGES.securityKey)
    : intl.formatMessage(MESSAGES.passkey);
}

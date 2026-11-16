import { CredentialDiscoverable, CredentialKind, CredentialType } from "apis/eduidSecurity";
import { APPLE_PROVIDER_NAME, PASSKEY_PROVIDERS } from "helperFunctions/passkeyProviders";

export type DescriptorNameSource = "mds" | "provider_table" | "attestation_format";

export interface CredentialDescriptor {
  // the name of the authenticator or provider, or null when nothing names it (unknown stays unknown)
  name: string | null;
  nameSource: DescriptorNameSource | null;
  kind: CredentialKind;
  discoverable: CredentialDiscoverable;
}

/**
 * What the data says about a security key or passkey, from the codes the backend returns. Pure and not shown
 * anywhere yet: it never invents a name, and a missing field (an older backend, or a credential that is not a key)
 * gives `unknown`.
 *
 * The name comes from, in order: the name MDS publishes, the provider table (by AAGUID), the Apple attestation
 * format. A credential found in the provider table is a passkey even when the backend could not tell.
 */
export function describeCredential(
  credential: Pick<
    CredentialType,
    "authenticator_id" | "authenticator_name" | "attestation_format" | "kind" | "discoverable"
  >,
): CredentialDescriptor {
  let kind: CredentialKind = credential.kind ?? "unknown";
  const discoverable: CredentialDiscoverable = credential.discoverable ?? "unknown";

  if (credential.authenticator_name) {
    return {
      name: credential.authenticator_name,
      nameSource: "mds",
      kind,
      discoverable,
    };
  }

  const providerName = credential.authenticator_id
    ? PASSKEY_PROVIDERS[credential.authenticator_id.toLowerCase()]
    : undefined;
  if (providerName) {
    if (kind === "unknown") {
      kind = "passkey";
    }
    return {
      name: providerName,
      nameSource: "provider_table",
      kind,
      discoverable,
    };
  }

  if (credential.attestation_format === "apple") {
    return {
      name: APPLE_PROVIDER_NAME,
      nameSource: "attestation_format",
      kind,
      discoverable,
    };
  }

  return { name: null, nameSource: null, kind, discoverable };
}

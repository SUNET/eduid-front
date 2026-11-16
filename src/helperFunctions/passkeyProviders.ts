// Names of passkey providers that FIDO MDS does not describe, keyed by AAGUID (lower case). Names only: they are
// brand names and are not translated, and no logos are bundled. Names are as published in the community AAGUID
// list (passkeydeveloper/passkey-authenticator-aaguids), checked 2026-11-13.
//
// Only an authenticator that MDS has no name for is looked up here, and every entry is a passkey provider
// (a credential found here is a passkey, not a security key).
export const PASSKEY_PROVIDERS: Readonly<Record<string, string>> = {
  "fbfc3007-154e-4ecc-8c0b-6e020557d7bd": "Apple Passwords",
  "ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4": "Google Password Manager",
  "d3452668-01fd-4c12-926c-83a4204853aa": "Microsoft Password Manager",
  "d548826e-79b4-db40-a3d8-11116f7e8349": "Bitwarden",
  "bada5566-a7aa-401f-bd96-45619a55120d": "1Password",
  "adce0002-35bc-c60a-648b-0b25f1f05503": "Chrome on Mac",
  "b5397666-4885-aa6b-cebf-e52262a439a2": "Chromium Browser",
  "50726f74-6f6e-5061-7373-50726f746f6e": "Proton Pass",
  "b84e4048-15dc-4dd0-8640-f4f60813c8af": "NordPass",
  "b78a0a55-6ef8-d246-a042-ba0f6d55050c": "LastPass",
};

// Attestation format `apple` is produced only by Apple's platform authenticator. Some Apple credentials use an
// AAGUID that is in no list, so the format names them.
export const APPLE_PROVIDER_NAME = "Apple";

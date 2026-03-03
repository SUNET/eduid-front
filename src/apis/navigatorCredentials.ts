import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { showNotification } from "slices/Notifications";
import { credentialToJSON } from "../helperFunctions/publicKeyCredentialToJSON";

export interface AuthenticationRequest {
  webauth_options: PublicKeyCredentialRequestOptionsJSON;
  mediation?: "conditional";
}

async function handlePerformAuthentication(args: AuthenticationRequest, signal?: AbortSignal) {
  const publicKey = PublicKeyCredential.parseRequestOptionsFromJSON(args.webauth_options);
  const credential = await navigator.credentials.get({
    publicKey,
    ...(signal && { signal }),
    mediation: args.mediation,
  });
  if (credential) {
    return { data: credentialToJSON(credential as PublicKeyCredential) };
  } else {
    throw new Error("dom_error.unable_to_obtain_credential");
  }
}

async function handleCreateCredential(args: PublicKeyCredentialCreationOptionsJSON) {
  const publicKey = PublicKeyCredential.parseCreationOptionsFromJSON(args);
  const credential = await navigator.credentials.create({ publicKey });
  if (credential) {
    return { data: credentialToJSON(credential as PublicKeyCredential) };
  }
  throw new Error("dom_error.unable_to_create_credential");
}

const navigatorCredentialsBaseQuery: BaseQueryFn = async (args, api) => {
  let errorMessage = "";
  try {
    switch (args.action) {
      case "performAuthentication":
        return await handlePerformAuthentication(args.payload, api.signal);
      case "createCredential":
        return await handleCreateCredential(args.payload);
      default:
        errorMessage = `Unknown action: ${args.action}`;
        break;
    }
  } catch (error) {
    if (error instanceof DOMException && (error.name === "AbortError" || error.name === "NotAllowedError")) {
      // AbortError: conditional auth was intentionally aborted (e.g. before starting staged auth)
      // NotAllowedError: user cancelled the dialog, or presented a credential that doesn't match
      // Both are expected user interactions — return a silent error without notification.
      return { error: { message: error.name } };
    } else if (error instanceof Error) {
      errorMessage = `${error.name}: ${error.message}`;
    } else {
      errorMessage = "Unknown error occurred.";
    }
  }
  api.dispatch(showNotification({ message: errorMessage, level: "error" }));
  return {
    error: {
      message: errorMessage,
    },
  };
};

export const navigatorCredentialsApi = createApi({
  baseQuery: navigatorCredentialsBaseQuery,
  reducerPath: "navigatorCredentialsApi",
  endpoints: (builder) => ({
    performAuthentication: builder.query<PublicKeyCredentialJSON, AuthenticationRequest>({
      query: (credentialRequestOptions) => ({
        action: "performAuthentication",
        payload: credentialRequestOptions,
      }),
    }),
    createCredential: builder.query<PublicKeyCredentialJSON, PublicKeyCredentialCreationOptionsJSON>({
      query: (registerRequestOptions) => ({
        action: "createCredential",
        payload: registerRequestOptions,
      }),
    }),
  }),
});

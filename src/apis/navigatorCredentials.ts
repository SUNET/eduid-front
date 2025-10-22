import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { showNotification } from "slices/Notifications";
import { credentialToJSON } from "../helperFunctions/publicKeyCredentialToJSON";

export interface AuthenticationRequest {
  webauth_options: PublicKeyCredentialRequestOptionsJSON;
  mediation?: "conditional";
}

let navigatorAbortController = new AbortController();

async function handlePerformAuthentication(args: AuthenticationRequest) {
  const publicKey = PublicKeyCredential.parseRequestOptionsFromJSON(args.webauth_options);
  const credential = await navigator.credentials.get({
    publicKey,
    signal: navigatorAbortController?.signal,
    mediation: args.mediation,
  });
  if (credential instanceof PublicKeyCredential && credential.response instanceof AuthenticatorAssertionResponse) {
    return { data: credentialToJSON(credential) };
  }
  throw new Error("Unable to obtain credential.");
}

async function handleCreateCredential(args: PublicKeyCredentialCreationOptionsJSON) {
  const publicKey = PublicKeyCredential.parseCreationOptionsFromJSON(args);
  const credential = await navigator.credentials.create({ publicKey });
  if (credential instanceof PublicKeyCredential && credential.response instanceof AuthenticatorAttestationResponse) {
    return { data: credentialToJSON(credential) };
  }
  throw new Error("Unable to create credential.");
}

function handleAbort() {
  navigatorAbortController.abort();
  navigatorAbortController = new AbortController();
  return { data: { message: "Request aborted" } };
}

const navigatorCredentialsBaseQuery: BaseQueryFn = async (args, api) => {
  let errorMessage = "";
  try {
    switch (args.action) {
      case "performAuthentication":
        return await handlePerformAuthentication(args.payload);
      case "createCredential":
        return await handleCreateCredential(args.payload);
      case "abort":
        return handleAbort();
      default:
        errorMessage = `Unknown action: ${args.action}`;
        break;
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { error: { message: "Request aborted" } };
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
    abort: builder.query<void, void>({
      query: () => ({
        action: "abort",
      }),
    }),
  }),
});

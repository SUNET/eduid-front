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
  try {
    const credential = await navigator.credentials.get({
      publicKey,
      signal: navigatorAbortController?.signal,
      mediation: args.mediation,
    });
    if (credential) {
      return { data: credentialToJSON(credential as PublicKeyCredential) };
    } else {
      throw new Error("dom_error.unable_to_obtain_credential");
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "NotAllowedError") {
      throw new Error("dom_error.not_allowed");
    } else {
      throw error;
    }
  }
}

async function handleCreateCredential(args: PublicKeyCredentialCreationOptionsJSON) {
  const publicKey = PublicKeyCredential.parseCreationOptionsFromJSON(args);
  try {
    const credential = await navigator.credentials.create({ publicKey });
    if (credential) {
      return { data: credentialToJSON(credential as PublicKeyCredential) };
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "NotAllowedError") {
      throw new Error("dom_error.not_allowed");
    } else {
      throw error;
    }
  }
  throw new Error("dom_error.unable_to_create_credential");
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

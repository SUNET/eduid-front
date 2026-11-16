import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { showNotification } from "slices/Notifications";
import { parseCreationOptions, parseRequestOptions } from "../helperFunctions/parseOptionsFromJSON";
import { credentialToJSON } from "../helperFunctions/publicKeyCredentialToJSON";

export interface AuthenticationRequest {
  webauth_options: PublicKeyCredentialRequestOptionsJSON;
  mediation?: "conditional";
}

async function handlePerformAuthentication(args: AuthenticationRequest, signal?: AbortSignal) {
  const publicKey = parseRequestOptions(args.webauth_options);
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

async function handleCreateCredential(args: PublicKeyCredentialCreationOptionsJSON, signal?: AbortSignal) {
  const publicKey = parseCreationOptions(args);
  const credential = await navigator.credentials.create({ publicKey, ...(signal && { signal }) });
  if (credential) {
    return { data: credentialToJSON(credential as PublicKeyCredential) };
  }
  throw new Error("dom_error.unable_to_create_credential");
}

// Message ids, defined in translation/defaultMessages/navigatorCredentials.tsx
export const DOM_ERROR_ALREADY_REGISTERED = "dom_error.already_registered";
export const DOM_ERROR_NOT_SUPPORTED = "dom_error.not_supported";
export const DOM_ERROR_SECURITY = "dom_error.security_error";

/**
 * What to tell the user about an error from navigator.credentials, from the DOMException name:
 * - `null`: say nothing. AbortError is an intentional abort (e.g. before starting staged auth), and NotAllowedError is
 *   the user cancelling the dialog or presenting a credential that does not match.
 * - `undefined`: no specific message, the caller falls back to the generic error.
 */
function domExceptionMessage(action: string, error: DOMException): string | null | undefined {
  switch (error.name) {
    case "AbortError":
      return null;
    case "NotAllowedError":
      // the user cancelled the dialog or it timed out, which they know already; or the credential presented does
      // not match. Expected user interactions, so say nothing.
      return null;
    case "InvalidStateError":
      // on registration: a credential on this authenticator is already registered (from excludeCredentials)
      return action === "createCredential" ? DOM_ERROR_ALREADY_REGISTERED : undefined;
    case "NotSupportedError":
      return DOM_ERROR_NOT_SUPPORTED;
    case "SecurityError":
      return DOM_ERROR_SECURITY;
    default:
      return undefined;
  }
}

const navigatorCredentialsBaseQuery: BaseQueryFn = async (args, api) => {
  let errorMessage = "";
  try {
    switch (args.action) {
      case "performAuthentication":
        return await handlePerformAuthentication(args.payload, api.signal);
      case "createCredential":
        return await handleCreateCredential(args.payload, api.signal);
      default:
        errorMessage = `Unknown action: ${args.action}`;
        break;
    }
  } catch (error) {
    const domMessage = error instanceof DOMException ? domExceptionMessage(args.action, error) : undefined;
    if (domMessage === null) {
      // an expected user interaction: return a silent error without notification
      return { error: { message: (error as DOMException).name } };
    } else if (domMessage !== undefined) {
      errorMessage = domMessage;
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
    performAuthentication: builder.query<AuthenticationResponseJSON, AuthenticationRequest>({
      query: (credentialRequestOptions) => ({
        action: "performAuthentication",
        payload: credentialRequestOptions,
      }),
    }),
    createCredential: builder.query<RegistrationResponseJSON, PublicKeyCredentialCreationOptionsJSON>({
      query: (registerRequestOptions) => ({
        action: "createCredential",
        payload: registerRequestOptions,
      }),
    }),
  }),
});

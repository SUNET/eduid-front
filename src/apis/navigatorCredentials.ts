import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";

const navigatorCredentialsBaseQuery: BaseQueryFn = async (args) => {
  let errorMessage: string = "";
  try {
    if (args.action === "performAuthentication") {
      const publicKey = PublicKeyCredential.parseRequestOptionsFromJSON(args.payload);
      const credential = await navigator.credentials.get({ publicKey });
      if (credential instanceof PublicKeyCredential && credential.response instanceof AuthenticatorAssertionResponse) {
        return { data: credential.toJSON() };
      } else {
        errorMessage = "Unable to obtain credential.";
      }
    }
    if (args.action === "createCredential") {
      const publicKey = PublicKeyCredential.parseCreationOptionsFromJSON(args.payload);
      const credential = await navigator.credentials.create({ publicKey });
      if (
        credential instanceof PublicKeyCredential &&
        credential.response instanceof AuthenticatorAttestationResponse
      ) {
        return { data: credential.toJSON() };
      } else {
        errorMessage = "Unable to create credential.";
      }
    }
  } catch (error) {
    if (error instanceof DOMException) {
      errorMessage = error.message;
    } else {
      errorMessage = "Unknown error occurred.";
    }
  }
  return {
    error: {
      status: 400,
      data: {
        message: errorMessage,
      },
    },
  };
};

export const navigatorCredentialsApi = createApi({
  baseQuery: navigatorCredentialsBaseQuery,
  reducerPath: "navigatorCredentialsApi",
  endpoints: (builder) => ({
    performAuthentication: builder.query<PublicKeyCredentialJSON, PublicKeyCredentialRequestOptionsJSON>({
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

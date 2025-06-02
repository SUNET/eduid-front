import { CredentialType, RemoveWebauthnTokensRequest } from "apis/eduidSecurity";
import { webauthnAttestation } from "helperFunctions/navigatorCredential";
import { ApiResponse, eduIDApi } from "./api";

interface UpdateOfficialUserDataResponse {
    message: string
}

interface PostDeleteAccountResponse {
  location: string;
}

export interface SecurityResponse {
  credentials: CredentialType[];
}

interface RegisterWebAuthnRequest {
    webauthn_attestation: webauthnAttestation
    description: string;
}

interface BeginRegisterWebAuthnRequest {
    authenticator: string;
}

interface BeginRegisterWebauthnResponse {
    registration_data: string
}

export const securityApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        updateOfficialUserData: builder.query<ApiResponse<UpdateOfficialUserDataResponse>, void>({
            query: () => ({
                url: "refresh-official-user-data",
                body: {}
            }),
            extraOptions: { service: "security" }
        }),
        postDeleteAccount: builder.query<ApiResponse<PostDeleteAccountResponse>, void>({
            query: () => ({
                url: "terminate-account",
                body: {}
            }),
            extraOptions: { service: "security" }
        }),
        removeWebauthnToken: builder.query<ApiResponse<SecurityResponse>, RemoveWebauthnTokensRequest>({
            query: (args) => ({
                url: "webauthn/remove",
                body: {
                    credential_key: args.credential_key
                }
            }),
            extraOptions: { service: "security" }
        }),
        requestCredentials: builder.query<ApiResponse<SecurityResponse>, void>({
            query: () => ({
                url: "credentials"
            }),
            extraOptions: { service: "security" }
        }),
        registerWebauthn: builder.query<ApiResponse<SecurityResponse>, RegisterWebAuthnRequest>({
            query: (args) => ({
                url: "webauthn/register/complete",
                body: {
                    attestationObject: args.webauthn_attestation.attestationObject,
                    clientDataJSON: args.webauthn_attestation.clientDataJSON,
                    credentialId: args.webauthn_attestation.credentialId,
                    description: args.description
                }
            }),
            extraOptions: { service: "security" }
        }),
        beginRegisterWebauthn: builder.query<ApiResponse<BeginRegisterWebauthnResponse>, BeginRegisterWebAuthnRequest>({
            query: (args) => ({
                url: "webauthn/register/begin",
                body: {
                    authenticator: args.authenticator
                }
            }),
            extraOptions: { service: "security" }
        })
    })
})

export default securityApi;